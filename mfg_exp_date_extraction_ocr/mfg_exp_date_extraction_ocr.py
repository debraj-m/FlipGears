

import base64
import datetime
import os
import tempfile
from difflib import SequenceMatcher
from io import StringIO

import cv2
import easyocr
import pandas as pd
import streamlit as st
from google.cloud import vision
from langchain_openai.chat_models import ChatOpenAI


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'keys.json'


if 'video_processed' not in st.session_state:
    st.session_state['video_processed'] = False

if 'csv_exported' not in st.session_state:
    st.session_state['csv_exported'] = False



client = vision.ImageAnnotatorClient()
ocr_reader = easyocr.Reader(['en'])

total_detections = {}

st.title("OCR App - Detect MFG and EXP Date from Video")


video_file = st.file_uploader("Upload a video", type=["mp4", "avi", "mov"])

schema = {
    "title": "manufacturing_and_expiry_date_details",
    "description": "These are the details of the product regarding expiry and manufacturing date",
    "type": "object",
    "properties": {
        "expiry_date": {
            "type": "string",
            "description": "Expiry date of the product in dd-mm-yyyy format."
        },
        "manufacturing_date": {
            "type": "string",
            "description": "Manufacturing date of the product in dd-mm-yyyy format"
        },
        "confidence": {
            "type": "number",
            "description": "The confidence score for the extracted data, how accurate it is from the context from range 0 to 1 if you are sure then only give higher confidence score otherwise below 0.8"
        }, 
    },
    "required": ["manufacturing_date", "expiry_date", "confidence",]
}


def are_similar(text1, text2, threshold=0.4):
    words1 = set(text1.lower().split())
    words2 = set(text2.lower().split())

    matching_words = words1.intersection(words2)
    
    total_words = max(len(words1), len(words2))
    match_ratio = len(matching_words) / total_words if total_words > 0 else 0


    return match_ratio > threshold

def extract_info_from_img(context: str):
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    
    refined_prompt = f"""
    The following text contains details related to the manufacturing and expiry dates of a product:
    
    {context}
    
    - Focus on extracting dates written in the dd/mm/yy format.
    - The expiry date should be a future date relative to today's date ({datetime.date.today()}).
    - The manufacturing date should be in the past and must precede the expiry date.
    Return the data with a confidence score.
    """
    
    runnable = llm.with_structured_output(schema)
    response = runnable.invoke(refined_prompt)
    return response


def export_to_csv(detections):

   try:

        csv_data = []
        keys = list(detections.keys())
 
        for i, key in enumerate(keys):
            detection_info = detections[key]['info']
            csv_data.append({
                "Manufacturing Date": detection_info.get("manufacturing_date", ""),
                "Expiry Date": detection_info.get("expiry_date", ""),
                "Confidence": detection_info.get("confidence", 0)
            })
       
        df = pd.DataFrame(csv_data).to_csv().encode('utf-8')
        return df
   except Exception as e:

        return pd.DataFrame([{}]).to_csv(index=False).encode('utf-8')  # Return empty DataFrame
       

def process_video(video_path, skip_frames=120, batch_size=5, resize_dim=(640, 480)):
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    frames_batch = []
    unique_detections = {}

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.resize(frame, resize_dim)

        if frame_count % skip_frames == 0:
            frames_batch.append(frame)

            if len(frames_batch) == batch_size:
                for i, frame in enumerate(frames_batch):
                    easyocr_results = ocr_reader.readtext(frame)
                    detected_texts = []

                    if easyocr_results:
                        for (bbox, text, prob) in easyocr_results:
                            top_left = tuple([int(x) for x in bbox[0]])
                            bottom_right = tuple([int(x) for x in bbox[2]])

                            if "MFG" in text or "EXP" in text:
                                cv2.rectangle(frames_batch[i], top_left, bottom_right, (0, 255, 0), 2)
                                cv2.putText(frames_batch[i], text, (top_left[0], top_left[1] - 10),
                                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
                            detected_texts.append(text)

                    if detected_texts:
                        context = " ".join(detected_texts)
                        _, encoded_image = cv2.imencode('.jpg', frame)
                        content = encoded_image.tobytes()
                        image = vision.Image(content=content)

                        response = client.text_detection(image=image)
                        texts = response.text_annotations

                        if texts:
                            context = " ".join([text.description for text in texts])
                            extracted_info = extract_info_from_img(context)
                            confidence = extracted_info.get('confidence', 0)

                            for key, value in unique_detections.items():
                                if are_similar(context, key):
                                    if confidence > value['info']['confidence']:
                                        unique_detections[context] = {'info': extracted_info, 'frame': frames_batch[i]}
                                    break
                            else:
                                unique_detections[context] = {'info': extracted_info, 'frame': frames_batch[i]}

                frames_batch = []

        frame_count += 1

    keys = list(unique_detections.keys())

    for i in range(len(keys)):
            unique = keys[i]
            data = unique_detections[unique]
            st.write("Extracted MFG and EXP details:")
            st.json(data['info'])
            frame_rgb = cv2.cvtColor(data['frame'], cv2.COLOR_BGR2RGB)
            st.image(frame_rgb, channels="RGB", use_column_width=True)
    st.session_state.total_detections= unique_detections  # Return the unique detections for further processing




# Process the uploaded video
if video_file is not None:
    tfile = tempfile.NamedTemporaryFile(delete=False)
    tfile.write(video_file.read())
    
       
    if not st.session_state['video_processed']: 

        if st.button("Process Video", key="process_video"):
            with st.spinner('Wait for it...'):
                process_video(tfile.name, skip_frames=120, batch_size=5)
                st.session_state['video_processed'] = True
                st.success("Video processed successfully! You can now export the results.")
    
    if st.session_state['video_processed'] and not st.session_state['csv_exported']:
        if st.button("Export to CSV", key="export_csv"):
            with st.spinner('Wait for it...'):
                csv_data = export_to_csv(st.session_state.total_detections)
                st.session_state['csv_data'] = csv_data
                st.session_state['csv_exported'] = True
                st.success("CSV exported successfully! You can now download the result.")
    if st.session_state['csv_exported']:
        st.download_button(label='📥 Download Current Result',
                           data=st.session_state['csv_data'],
                           file_name='detections.csv',
                           mime='text/csv')

#   
