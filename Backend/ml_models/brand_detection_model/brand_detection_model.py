import concurrent.futures
import tempfile
import time
from io import BytesIO

import cv2 as cv
import numpy as np
import pandas as pd
from skimage.metrics import structural_similarity
from ultralytics import YOLO

from models.base_model import BaseModel


class BrandLogoDetectionModel(BaseModel):
    def __init__(self):
        self._name = "brand-logo-detection"
        self.model = YOLO(
            r"ml_models/brand_detection_model/pre_trained_models/trained_model.pt",
            verbose=True,
        )
        self.detections = {class_name: 0 for class_name in self.model.names}
        self.timestamp = []
        self.brand = []
        self.start_time = time.time()
        self.class_names = (
            self.model.names
        )  # Dictionary relating class_id to class_name

    def name(self):
        return self._name

    def process_frame(self, frame, prev_frame=None, write=True):
        # Convert current and previous frames to grayscale
        frame_curr_g = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        frame_prev_g = (
            cv.cvtColor(prev_frame, cv.COLOR_BGR2GRAY)
            if prev_frame is not None
            else np.zeros_like(frame_curr_g)
        )

        # Compute SSIM (Structural Similarity Index) between the current and previous frame
        ssim = structural_similarity(frame_curr_g, frame_prev_g)

        # If SSIM is below threshold (indicating a significant change), process the frame
        if ssim <= 0.7:
            results = self.model(frame, stream=True, max_det=1)  # Perform inference
            for r in results:
                for box in r.boxes:
                    [x1, y1, x2, y2] = box.xyxy[0]
                    x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
                    class_id = int(box.cls[0].item())
                    class_name = self.class_names.get(class_id, "Unknown")
                    confidence = box.conf[0].item()

                    # Draw rectangle and label on frame
                    if write:
                        cv.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                        cv.putText(
                            frame,
                            f"{class_name}: {confidence:.2f}",
                            (x1, y1 - 10),
                            cv.FONT_HERSHEY_SIMPLEX,
                            0.9,
                            (0, 0, 255),
                            2,
                        )

                    # Increment detection count for the corresponding brand
                    if class_name in self.detections.keys():
                        self.detections[class_name] += 1
                        self.timestamp.append(time.time() - self.start_time)
                        self.brand.append(class_name)
                    else:
                        self.detections[class_name] = 0

        return frame

    def process_from_video(self, video_bytes: BytesIO):
        # Write the bytes to a temporary file
        with tempfile.NamedTemporaryFile(delete=True, suffix=".mp4") as temp_video:
            temp_video.write(video_bytes)
            temp_video.flush()  # Ensure all bytes are written to the file

            # Open the video using the temporary file path
            video_stream = cv.VideoCapture(temp_video.name)

            if not video_stream.isOpened():
                raise ValueError("Failed to open video stream from bytes")

            # Concurrently process frames
            with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
                futures = []
                prev_frame = None
                frame_count = 0
                while True:
                    ret, frame = video_stream.read()  # Read the next frame
                    if not ret:
                        break  # Exit loop if no more frames

                    # Submit frame processing task to the executor
                    futures.append(
                        executor.submit(
                            self.process_frame, frame, prev_frame, write=False
                        )
                    )

                    # Update prev_frame for next comparison
                    prev_frame = frame

                # Wait for all tasks to complete
                for future in concurrent.futures.as_completed(futures):
                    future.result()  # Propagate exceptions, if any

            video_stream.release()

    def get_detections_csv(self) -> BytesIO:
        # Convert the detections dictionary to a DataFrame
        df = pd.DataFrame([self.detections])

        # Save as CSV in memory
        csv_buffer = BytesIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        return csv_buffer

    def save_detections(self, output_file: str = "Brand_Logo_Detection_Counts.csv"):
        # Save the brand logo detection results as a CSV file
        df = pd.DataFrame([self.detections])
        df.to_csv(output_file, index=False)
        print(f"Brand logo detections have been saved to {output_file}")
