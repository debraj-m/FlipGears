import asyncio
import base64
import io
import time

import cv2 as cv
import numpy as np
import pandas as pd
from fastapi import FastAPI, File, HTTPException, UploadFile, WebSocket
from fastapi.responses import HTMLResponse, StreamingResponse
from ultralytics import YOLO

from ml_models.freshness_detection_model.freshness_detection_model import FreshnessDetectionModel
from models.base_model import DetectionModels
from services.websocket_service import WebSocketService

app = FastAPI()


def get_model(model_name):
    # Load the model from the specified name
    # return the loaded model
    if model_name == DetectionModels.FRESHNESS_DETECTION:
        return FreshnessDetectionModel()


@app.websocket("/ws/{model_name}")
async def websocket_router(websocket: WebSocket, model_name: DetectionModels):
    # if model_name not in DetectionModels._member_names_:
    #     raise HTTPException(status_code=404, detail="Model not found")
    # else:
    model = get_model(model_name)

    service = WebSocketService(websocket, model)
    await service.handle()



@app.post("/process_video/{model_name}")
async def process_video(model_name: DetectionModels, file: UploadFile = File(...)):
    """
    Process the uploaded video using the specified model and return the results as a CSV.
    """
    # Read the uploaded video bytes
    video_bytes = await file.read()

    model = get_model(model_name)
    model.process_from_video(video_bytes)
    csv_file = model.get_detections_csv()
      # Load CSV into a DataFrame
    csv_data = pd.read_csv(csv_file)

    # Save the DataFrame to a buffer
    csv_buffer = io.BytesIO()
    csv_data.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)

    # Return the CSV as a StreamingResponse
    return StreamingResponse(
        csv_buffer,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={model_name}_results.csv"},
    )

@app.get("/")
async def get_client():
    with open("index.html", "r") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content)
