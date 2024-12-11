import cv2 as cv
from ultralytics import YOLO
import pandas as pd
import numpy as np
import time
from skimage.metrics import structural_similarity
#initializing model with pre determined weights obtained after training
model = YOLO(r"FlipkartGrid\est.pt")
video = cv.VideoCapture(0)
start_time = time.time()#current time when the program starts executing
class_names=model.names# dictionary relating class_id to class_name
conf=np.array([])
freshness_score=np.array([])
start=1
start_time=time.time()
found=False
Product=[]
Timestamp=[]
frame_n=0
while True: #using OpenCV to take input from webcam
    ret, frame = video.read()
    frame_curr=frame
    res=frame
    if(start):
        frame_prev=np.zeros_like(frame_curr)
        start=0
    frame_curr_g=cv.cvtColor(frame_curr, cv.COLOR_BGR2GRAY)
    frame_prev_g=cv.cvtColor(frame_prev, cv.COLOR_BGR2GRAY)
    ssim=structural_similarity(frame_curr_g, frame_prev_g)
    if(ssim<=0.3 and frame_n%5==0):
        results = model(frame, stream=True, max_det=1)
        for r in results:
            for box in r.boxes:
                [x1, y1, x2, y2] = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                class_id = int(box.cls[0].item())
                class_name=model.names.get(box.cls[0].item(), "Unknown")
                confidence = box.conf[0].item()
                curr_time=time.time()
                if((curr_time-start_time)>=5):
                 cv.rectangle(res, (x1, y1), (x2, y2), (0, 255, 0), 2)
                 cv.putText(res, f"{class_name}: {confidence}", (x1, y1 - 10),cv.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
                 key=cv.waitKey(2000)
                 Product=np.append(Product,class_name)
                 freshness_score=np.append(freshness_score,np.mean(conf))
                 conf=np.array([])
                 found=True
                 start_time=time.time()
                else:
                    conf=np.append(conf,confidence)
                prev_class_name=class_name
                
        print(ssim)
    frame_n=frame_n+1
    if(found==True):
        res=cv.putText(res,'DONE!',(int(res.shape[0]/3),int(res.shape[1]/3)),cv.FONT_HERSHEY_SIMPLEX,2,(0,255,0),2)
    cv.imshow('Brand Detection', res)
    if(found):
        key=cv.waitKey(1000)
        found=False
    frame_prev=frame
    if cv.waitKey(5) & 0xFF == ord('q'):
        break
video.release()
cv.destroyAllWindows()
#dictionary with Product and freshness_score

df_d={'Product':Product,'Freshness':freshness_score}
df=pd.DataFrame(df_d)
csv_file = 'Freshness Detection Counts.csv' 
df.to_csv(csv_file)# the excel sheet is saved as Brand Detection Counts
print(f"Freshness detections have been saved to {csv_file}")
