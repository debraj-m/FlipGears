import tempfile
import time
from datetime import datetime
from io import BytesIO

import cv2 as cv
import numpy as np
import pandas as pd
from skimage.metrics import structural_similarity
from ultralytics import YOLO


class BrandLogoDetectionModel:
    def __init__(self):
        self._name = "brand-logo-detection"
        self.model = YOLO(
            "ml_models/brand_detection_model/pre_trained_models/trained_model.pt"
        )
        self.detections = {class_name: 0 for class_name in self.model.names}
        self.timestamp = []
        self.brand = []
        self.start_time = time.time()
        self.class_names = (
            self.model.names
        )  # Dictionary relating class_id to class_name
        self.latest_detection_time = time.time()
        self.prev_class_name = "None"

    def name(self):
        return self._name

    def process_frame(self, frame, prev_frame=None, write=True):
        # Convert current and previous frames to grayscale

        frame_curr_g = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        if prev_frame is not None:
            frame_prev_g = cv.cvtColor(prev_frame, cv.COLOR_BGR2GRAY)

            # Compute SSIM (Structural Similarity Index) between the current and previous frame
            ssim = structural_similarity(frame_curr_g, frame_prev_g)

        # If SSIM is below threshold (indicating a significant change), process the frame
        if prev_frame is not None and ssim <= 0.8:
            results = self.model(frame, stream=True, max_det=1)  # Perform inference
            for r in results:
                for box in r.boxes:
                    [x1, y1, x2, y2] = box.xyxy[0]
                    x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
                    class_id = int(box.cls[0].item())
                    class_name = self.class_names.get(class_id, "Unknown")
                    confidence = box.conf[0].item()
                    detection_time = time.time()
                    if (
                        detection_time - self.latest_detection_time > 5
                        or self.prev_class_name != class_name
                    ):
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
                        self.timestamp.append(datetime.now())
                        self.brand.append(class_name)
                        self.latest_detection_time = time.time()
                        self.prev_class_name = class_name

        return frame

    def process_from_video(self, path):
        # Open the video using the temporary file path
        video_stream = cv.VideoCapture(path)
        if not video_stream.isOpened():
            raise ValueError("Failed to open video stream from bytes")
        prev_frame = None
        while True:
            ret, frame = video_stream.read()  # Read the next frame
            if not ret:
                break  # Exit loop if no more frames
            if prev_frame is not None:
                self.process_frame(frame, prev_frame, write=True)
            prev_frame = frame
            if cv.waitKey(5) & 0xFF == ord("q"):
                break
        video_stream.release()

    def get_detections_csv(self):

        df = pd.DataFrame({"Brand": self.brand, "Timestamp": self.timestamp})
        # Save as CSV in memory
        csv_buffer = BytesIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        return csv_buffer
