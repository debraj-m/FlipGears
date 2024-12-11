from io import BytesIO
import cv2 as cv
import numpy as np
import pandas as pd
from ultralytics import YOLO
import tempfile
import concurrent.futures
from models.base_model import BaseModel


class FreshnessDetectionModel(BaseModel):
    def __init__(self):
        self._name = "freshness-detection"
        self.model = YOLO("est.pt",verbose=False)
        self.detections = []

    def name(self):
        return self._name

    def process_frame(self, frame, prev_frame=None, write=True):
        results = self.model(frame, stream=True)
        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                class_id = int(box.cls[0].item())
                class_name = self.model.names.get(class_id, "Unknown")
                confidence = box.conf[0].item()
                self.detections.append({"class": class_name, "confidence": confidence})
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
        return frame


    def process_from_video(self, video_bytes):
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
                while True:
                    ret, frame = video_stream.read()  # Read the next frame
                    if not ret:
                        break  # Exit loop if no more frames
                    
                    # Submit frame processing task to the executor
                    futures.append(executor.submit(self.process_frame, frame, write=False))

                # Wait for all tasks to complete
                for future in concurrent.futures.as_completed(futures):
                    future.result()  # Propagate exceptions, if any

            video_stream.release()



    def get_detections_csv(self)->BytesIO:
        df = pd.DataFrame(self.detections)
        csv_buffer = BytesIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        return csv_buffer
    
