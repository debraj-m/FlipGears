from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from enum import Enum
import cv2 as cv
import numpy as np
import base64
from ultralytics import YOLO

from typing import Literal
from models.base_model import BaseModel, DetectionModels

class WebSocketService:
    def __init__(self, websocket: WebSocket, model: BaseModel):
        self.websocket = websocket 
        self.model: BaseModel = model
        self.prev_frame = None
        self.detections = None
        self.streaming = False

    async def receive_frame(self, encoded_frame: str):
        """Receive a base64-encoded frame from the WebSocket client."""
        frame_bytes = base64.b64decode(encoded_frame)
        np_frame = np.frombuffer(frame_bytes, dtype=np.uint8)
        frame = cv.imdecode(np_frame, cv.IMREAD_COLOR)
        return frame

    def process_frame(self, frame):
        """Process the frame using the selected model."""
        self.model.process_frame(frame)
        self.prev_frame = frame.copy()
        return frame

    async def send_frame(self, frame):
        """Send the processed frame back to the WebSocket client."""
        _, buffer = cv.imencode(".jpg", frame)
        processed_frame = base64.b64encode(buffer).decode("utf-8")
        await self.websocket.send_json({
            "type": "frame",
            "frame": processed_frame
        })

    async def send_detection_csv(self):
        """Send the detections CSV as a base64-encoded string."""
        detections = self.model.get_detections_csv()
        detections.seek(0)
        byte_data = detections.getvalue()
        await self.websocket.send_json({
            "type": "detections",
            "data": base64.b64encode(byte_data).decode("utf-8")
        })

    async def handle(self):
        """Handle the WebSocket connection."""
        await self.websocket.accept()
        try:
            while True:
                msg = await self.websocket.receive_json()
                msg_type = msg.get("type")

                if msg_type == "start":
                    print("Client started streaming.")
                    self.streaming = True

                elif msg_type == "frame" and self.streaming:
                    frame = await self.receive_frame(msg.get("frame"))
                    processed_frame = self.process_frame(frame)
                    await self.send_frame(processed_frame)

                elif msg_type == "stop":
                    print("Client stopped streaming. Sending detections.")
                    self.streaming = False
                    await self.send_detection_csv()
                    await self.websocket.send_json({"type": "stop"})
                    break

        except WebSocketDisconnect:
            print(f"Client disconnected from {self.model.name} WebSocket.")
