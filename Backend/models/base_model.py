from abc import ABC, abstractmethod
from enum import Enum
from io import BytesIO


class DetectionModels(Enum):
    FRESHNESS_DETECTION = "freshness-detection"
    BRAND_DETECTION = "brand-detection"
    MFG_EXPIRY_DETECTION = "mfg-expiry-detection-model"
    COUNT_MODEL = "count-model"


class BaseModel(ABC):
    pass

    @property
    def name(self):
        """
        The name of the model
        """
        pass

    @abstractmethod
    def process_frame(self, frame, prev_frame):
        """
        Process the frame and return the processed frame
        """
        pass

    @abstractmethod
    def process_from_video(self, video_bytes: BytesIO):
        """
        Process the video and return the processed video
        """
        pass

    @abstractmethod
    def get_detections_csv(self) -> BytesIO:
        """
        Get the detections in a CSV format
        """
        pass
