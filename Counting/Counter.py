import cv2 as cv
from ultralytics import YOLO
import pandas as pd
import numpy as np
from skimage.metrics import structural_similarity
import datetime
from datetime import datetime
#initializing model with pre determined weights obtained after training
model = YOLO(r"best.pt")
video = cv.VideoCapture(r'product_test.mp4')
start=0
found=False
final_result=0
while True: 
    ret,frame=video.read()
    if(ret!=True):
        break
    curr_frame=frame
    if(start==0):
        prev_frame=np.zeros_like(curr_frame)
        start=1
    curr_frame_g=cv.cvtColor(curr_frame,cv.COLOR_BGR2GRAY)
    prev_frame_g=cv.cvtColor(prev_frame,cv.COLOR_BGR2GRAY)
    ssim=structural_similarity(curr_frame_g,prev_frame_g)
    if(ssim>=0.99):
        results = model(curr_frame,stream=True,max_det=100)
        prods=0
        for r in results:
           for box in r.boxes:
             [x1, y1, x2, y2] = box.xyxy[0]
             prods=prods+1
             x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
             curr_frame=cv.rectangle(curr_frame, (x1, y1), (x2, y2), (0, 0, 255),2)
             found=True
        final_result=prods
        final_timestamp=datetime.now()
    cv.imshow('YOLO Object Detection', curr_frame)
    if(found):
        if cv.waitKey(2000) & 0xFF == ord('q'):
         break
        
    found=False
    prev_frame=curr_frame
    print(ssim)
    if cv.waitKey(5) & 0xFF == ord('q'):
        break
video.release()
cv.destroyAllWindows()

df={'Quantity':[final_result],'Timestamp':[final_timestamp]}
df_dt=pd.DataFrame(df)
df_dt.to_csv('product_count.csv')

    
