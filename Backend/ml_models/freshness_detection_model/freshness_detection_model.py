import concurrent.futures
import tempfile
import time
from datetime import datetime
from io import BytesIO

import cv2 as cv
import numpy as np
import pandas as pd
from skimage.metrics import structural_similarity
from ultralytics import YOLO

from models.base_model import BaseModel


class FreshnessDetectionModel(BaseModel):
    def __init__(self):
        self._name = "freshness-detection"
        # Load the model with pre-trained weights
        self.model = YOLO(
            "ml_models/freshness_detection_model/pre_trained_models/trained_model.pt"
        )
        self.detections = []
        self.class_names = self.model.names  # Mapping class_id to class_name
        self.freshness_scores = []
        self.products = []
        self.timestamps = []
        self.remaining_days = []  # Added for the remaining days of freshness

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
        detection_made = False

        # Check if SSIM is below the threshold to process frame (indicating a significant change)
        if ssim <= 0.3:
            results = self.model(frame, stream=True, max_det=1)  # Perform inference
            for r in results:
                for box in r.boxes:
                    [x1, y1, x2, y2] = box.xyxy[0]
                    x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
                    class_id = int(box.cls[0].item())
                    class_name = self.class_names.get(class_id, "Unknown")
                    confidence = box.conf[0].item()

                    # Append class and confidence score to respective lists
                    self.products.append(class_name)
                    self.freshness_scores.append(confidence)

                    # Record the timestamp when detection occurred
                    self.timestamps.append(
                        datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")
                    )

                    # Calculate remaining days based on freshness score (Example logic)
                    remaining_days = self.calculate_remaining_days(confidence)
                    self.remaining_days.append(remaining_days)

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
                    detection_made = True

        # Add "DONE!" text if detection was made
        if detection_made and write:
            height, width, _ = frame.shape
            cv.putText(
                frame,
                "DONE!",
                (width // 3, height // 3),
                cv.FONT_HERSHEY_SIMPLEX,
                2,
                (0, 255, 0),
                3,
            )

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

            # Skip 320 frames
            frame_count = 0
            while frame_count < 320:
                ret = video_stream.grab()  # Grab frames without decoding them
                if not ret:
                    print("Not enough frames to skip.")
                    return  # Exit if there are fewer than 320 frames
                frame_count += 1

            # Concurrently process frames
            with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
                futures = []
                prev_frame = None
                start_time = time.time()
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

    def calculate_remaining_days(self, freshness_score):
        # Example logic to calculate remaining days based on freshness score
        # You may want to replace this logic with an actual model or calculation
        if freshness_score > 8.0:
            return 7  # More fresh, 7 days left
        elif freshness_score > 6.0:
            return 5  # Moderately fresh, 5 days left
        elif freshness_score > 4.0:
            return 3  # Less fresh, 3 days left
        else:
            return 1  # Not fresh, 1 day left

    def get_detections_csv(self) -> BytesIO:
        # Create DataFrame from the collected detections with the new fields
        df = pd.DataFrame(
            {
                "Timestamp": self.timestamps,
                "Product": self.products,
                "Freshness": self.freshness_scores,
                "Remaining Days": self.remaining_days,
            }
        )

        # Save as CSV in memory
        csv_buffer = BytesIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        return csv_buffer

    def save_detections(self, output_file: str = "Freshness_Detection_Counts.csv"):
        # Save the freshness detection results as a CSV file
        df = pd.DataFrame(
            {
                "Timestamp": self.timestamps,
                "Product": self.products,
                "Freshness": self.freshness_scores,
                "Remaining Days": self.remaining_days,
            }
        )
        df.to_csv(output_file, index=False)
        print(f"Freshness detections have been saved to {output_file}")
