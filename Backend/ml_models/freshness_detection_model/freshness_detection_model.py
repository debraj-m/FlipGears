import tempfile
import time
from datetime import datetime
from io import BytesIO

import cv2 as cv
import numpy as np
import pandas as pd
from skimage.metrics import structural_similarity
from ultralytics import YOLO

# from models.base_model import BaseModel


class FreshnessDetectionModel:
    def __init__(self):
        self._name = "freshness-detection"
        # Load the model with pre-trained weights
        self.model = YOLO("yolo11n.pt")
        self.target_classes = ["apple", "banana", "orange"]
        self.class_indices = [
            list(self.model.names.keys())[list(self.model.names.values()).index(cls)]
            for cls in self.target_classes
            if cls in self.model.names.values()
        ]
        self.freshness_scores = []
        self.products = []
        self.timestamps = []
        self.remaining_days = []  # Added for the remaining days of freshness
        self.latest_detection_time = time.time()
        self.prev_class_name = "None"

    def name(self):
        return self._name

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

    def process_frame(self, frame, prev_frame=None, write=True):
        # Convert current and previous frames to grayscale
        frame_curr_g = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        if prev_frame is not None:
            frame_prev_g = cv.cvtColor(prev_frame, cv.COLOR_BGR2GRAY)
            # Compute SSIM (Structural Similarity Index) between the current and previous frame
            ssim = structural_similarity(frame_curr_g, frame_prev_g)

        # If SSIM is below threshold (indicating a significant change), process the frame
        if prev_frame is not None and ssim <= 0.9:
            results = self.model(
                frame, stream=True, max_det=1, classes=self.class_indices
            )  # Perform inference
            for r in results:
                for box in r.boxes:
                    [x1, y1, x2, y2] = box.xyxy[0]
                    x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
                    class_id = int(box.cls[0].item())
                    class_name = self.model.names.get(class_id, "Unknown")
                    confidence = box.conf[0].item()
                    detection_time = time.time()
                    if (
                        detection_time - self.latest_detection_time > 20
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
                        self.timestamps.append(datetime.now())
                        self.freshness_scores.append(confidence * 10)
                        self.remaining_days.append(
                            self.calculate_remaining_days(confidence * 10)
                        )
                        self.products.append(class_name)
                        self.latest_detection_time = time.time()
                        self.prev_class_name = class_name
        return frame

    def process_from_video(self, path):
        # # Write the bytes to a temporary file
        # with tempfile.NamedTemporaryFile(delete=True, suffix=".mp4") as temp_video:
        #     temp_video.write(video_bytes)
        #     temp_video.flush()  # Ensure all bytes are written to the file

        # Open the video using the temporary file path
        video_stream = cv.VideoCapture(path)

        if not video_stream.isOpened():
            raise ValueError("Failed to open video stream from bytes")
        prev_frame = None
        while True:
            ret, frame = video_stream.read()  # Read the next frame
            if not ret:
                break
            if prev_frame is not None:
                self.process_frame(frame, prev_frame, write=True)
            prev_frame = frame
            if cv.waitKey(5) & 0xFF == ord("q"):
                break
        video_stream.release()

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
