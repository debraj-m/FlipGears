import re
from datetime import datetime
from io import BytesIO

import cv2 as cv
import dateutil.parser
import pandas as pd
from paddleocr import PaddleOCR

from models.base_model import BaseModel, DetectionModels


def validate_date(parsed_date):
    current_year = datetime.now().year
    return (
        current_year - 10 <= parsed_date.year <= current_year + 10
        and 1 <= parsed_date.month <= 12
    )


def parse_date_multiple_methods(date_str):
    try:
        parsed_date = dateutil.parser.parse(date_str, fuzzy=False)
        if validate_date(parsed_date):
            return parsed_date
    except:
        pass
    return None


def find_expiry_date_expression_matching(text):
    date_patterns = [
        r"EXP(?:IRY)?[\s:]*(\d{2}[-/]\d{2}[-/]\d{2,4})",
        r"EXP(?:IRY)?[\s:]*(\d{2}[-/][A-Za-z]{3}[-/]\d{2,4})",
        r"BEST[\s]*(?:BEFORE|BY)[\s:]*(\d{2}[-/]\d{2}[-/]\d{2,4})",
        r"USE[\s]*(?:BEFORE|BY)[\s:]*(\d{2}[-/]\d{2}[-/]\d{2,4})",
    ]
    for pattern in date_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            parsed_date = parse_date_multiple_methods(match.group(1))
            if parsed_date:
                return parsed_date
    return None


def find_expiry_date_brute(text):
    date_patterns = [r"(\d{2}[-/]\d{2}[-/]\d{2,4})"]
    valid_dates = []
    for pattern in date_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            parsed_date = parse_date_multiple_methods(match)
            if parsed_date:
                valid_dates.append(parsed_date)

    return max(valid_dates) if valid_dates else None


class ExpiryDateDetectionModel(BaseModel):
    def __init__(self):
        self._name = DetectionModels.MFG_EXPIRY_DETECTION
        self.model = PaddleOCR(lang="en", use_angle_cls=False)
        self.detections = []

    def name(self):
        return self._name

    def process_frame(self, frame, prev_frame=None, write=True):
        result = self.model.ocr(frame, cls=True)
        full_text = ""
        if result and result[0]:
            for res in result[0]:
                text = res[1][0]
                full_text = full_text + " " + text + " "

        expiry_date_e_m = find_expiry_date_expression_matching(full_text)
        expiry_date_b = find_expiry_date_brute(full_text)

        exp_date_res = None
        if expiry_date_b and expiry_date_e_m:
            if expiry_date_e_m != expiry_date_b:
                exp_date_res = max(expiry_date_b, expiry_date_e_m)
        elif expiry_date_e_m:
            exp_date_res = expiry_date_e_m
        elif expiry_date_b:
            exp_date_res = expiry_date_b

        if exp_date_res:
            if exp_date_res < datetime.now():
                self.detections.append(
                    {
                        "expiry_date": exp_date_res,
                        "status": "Expired",
                        "days_remaining": None,
                    }
                )
            else:
                self.detections.append(
                    {
                        "expiry_date": exp_date_res,
                        "status": "Not Expired",
                        "days_remaining": (exp_date_res - datetime.now()).days,
                    }
                )

        return frame

    def process_from_video(self, video_bytes: BytesIO):
        # Process video bytes as frames and detect expiry dates in them
        video_stream = cv.VideoCapture(video_bytes)

        if not video_stream.isOpened():
            raise ValueError("Failed to open video stream from bytes")

        frame_count = 0
        while True:
            ret, frame = video_stream.read()
            if not ret:
                break  # Exit loop if no more frames

            self.process_frame(frame)
            frame_count += 1

        video_stream.release()

    def get_detections_csv(self) -> BytesIO:
        df = pd.DataFrame(self.detections)
        csv_buffer = BytesIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        return csv_buffer
