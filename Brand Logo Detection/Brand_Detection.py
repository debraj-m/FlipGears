import cv2 as cv
from ultralytics import YOLO
import pandas as pd
import numpy as np
import time
#initializing model with pre determined weights obtained after training
model = YOLO(".vscode\FlipkartGrid\logo_detection_extended.pt")
video = cv.VideoCapture(0)
product_detections = np.zeros(len(list(model.names.keys())))
product_detections=list(product_detections)
interval_duration = 5# time interval in which each product shows up
start_time = time.time()#current time when the program starts executing
class_names=model.names# dictionary relating class_id to class_name
while True: #using OpenCV to take input from webcam
    ret, frame = video.read()
    results = model(frame, stream=True, max_det=1)
    for r in results:
        for box in r.boxes:
            [x1, y1, x2, y2] = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            cv.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            class_id = int(box.cls[0].item())
            class_name=model.names.get(box.cls[0].item(), "Unknown")
            confidence = box.conf[0].item()
            cv.putText(frame, f"{class_name}: {confidence}", (x1, y1 - 10),cv.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
            if time.time() - start_time >= interval_duration:#products detected in 5 seconds is counted as a single product
                product_detections[class_id]=product_detections[class_id]+1
                start_time = time.time()
    cv.imshow('YOLO Object Detection', frame)
    if cv.waitKey(5) & 0xFF == ord('q'):
        break
video.release()
cv.destroyAllWindows()
dict={}
for i in range(len(product_detections)):
    dict[(model.names[i])]=product_detections[i]
print(dict)
dict_list=[dict]
df=pd.DataFrame(dict_list)
csv_file = 'Brand Detection Counts.csv' 
df.to_csv(csv_file)# the excel sheet is saved as Brand Detection Counts
print(f"Brand detections have been saved to {csv_file}")
