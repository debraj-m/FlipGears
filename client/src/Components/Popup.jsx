import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './Popup.css';

const YoloPopup = ({ modelName, onClose }) => {
  const videoRef = useRef(null);
  const processedImageRef = useRef(null);
  const [ws, setWs] = useState(null);
  const [stream, setStream] = useState(null);
  const [csvLink, setCsvLink] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Checking system status...');
  const [isWaiting, setIsWaiting] = useState(true);
  const intervalRef = useRef(null);

  const checkSystemStatus = async () => {
    try {
      const response = await axios.get('https://asia-south1-assisto-dev-52a1d.cloudfunctions.net/proxy-1');
      
      console.log('Response Status:', response.status);
  
      if (response.data.status === 'running') {
        setIsReady(true);
        setLoadingMessage('Containers are up, ready to start stream...');
        setIsWaiting(false);
      } else {
        setLoadingMessage('System not ready, retrying...');
        setTimeout(checkSystemStatus, 5000);  // Retry after 5 seconds
      }
    } catch (error) {
      console.error('Error checking system status:', error.message);
      setLoadingMessage(`Error checking system status: ${error.message}, retrying...`);
      setTimeout(checkSystemStatus, 5000);  // Retry after 5 seconds
    }
  };

  const startStreaming = async () => {
    try {
     
      if (ws) return;

      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = videoStream;
      setStream(videoStream);
      let websocketUrl;
      if (
        window.location.origin.includes('localhost') ||
        window.location.origin.includes('127.0.0.1') ||
        window.location.origin.includes('0.0.0.0')
      ) {
        // websocketUrl = `ws://127.0.0.1:8000/ws/${modelName}`
         websocketUrl = `wss://flipgears-347795434098.asia-south1.run.app/ws/${modelName}`
      } else {
        websocketUrl = `wss://flipgears-347795434098.asia-south1.run.app/ws/${modelName}`
      }
      
   

      const websocket = new WebSocket(websocketUrl);
      websocket.onopen = () => {
        websocket.send(JSON.stringify({ type: 'start' }));
        console.log('Streaming started.');
      };

      websocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'frame') {
          if (processedImageRef.current) {
            processedImageRef.current.src = `data:image/jpeg;base64,${message.frame}`;
          }
        } else if (message.type === 'detections') {
          const base64Csv = message.data;
          const csvBlob = new Blob([atob(base64Csv)], { type: 'text/csv' });
          const csvUrl = URL.createObjectURL(csvBlob);
          setCsvLink(csvUrl);
        } else if (message.type === 'stop') {
          console.log('Server indicated safe to close connection.');
          stopStreaming();
        }
      };

      const videoTrack = videoStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      const sendFrame = () => {
        imageCapture.grabFrame().then((frame) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = frame.width;
          canvas.height = frame.height;
          ctx.drawImage(frame, 0, 0);

          canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64Data = reader.result.split(',')[1];
              if (websocket.readyState === WebSocket.OPEN) {
                websocket.send(JSON.stringify({
                  type: 'frame',
                  frame: base64Data,
                }));
              }
            };
            reader.readAsDataURL(blob);
          });
        });
      };

      intervalRef.current = setInterval(sendFrame, 120);
      setWs(websocket);
      setIsStreaming(true);
      setIsWaiting(false);  // System is ready, stop showing loading message
    } catch (error) {
      console.error('Error accessing webcam: ', error);
    }
  };

  const stopStreaming = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'stop' }));
      setWs(null);
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    clearInterval(intervalRef.current);
    setIsStreaming(false);
  };

  useEffect(() => {
    checkSystemStatus();

    return () => {
      stopStreaming();
    };
  }, []);

  if (isWaiting) {
    return (
      <div className="loading-popup">
        <div className="loading-message">{loadingMessage}</div>
      </div>
    );
  }

  return (
    <div className="yolo-popup">
      <div className="popup-header">
        <h1>Real-Time YOLO Object Detection</h1>
        <button className="close-button" onClick={() => { stopStreaming(); onClose(); }}>Close</button>
      </div>
      <div className="stream-container">
        <video ref={videoRef} autoPlay muted className="video-stream"></video>
        <img ref={processedImageRef} alt="Processed Frame" className="processed-frame" />
      </div>
      <div className="popup-controls">
        <button className="control-button" onClick={startStreaming} disabled={isStreaming}>Start Streaming</button>
        <button className="control-button" onClick={stopStreaming} disabled={!isStreaming}>Stop Streaming</button>
      </div>
      {csvLink && (
        <div className="csv-download">
          <h2>Detection Results (CSV):</h2>
          <a href={csvLink} download="detections.csv" className="csv-link">Download Detections CSV</a>
        </div>
      )}
    </div>
  );
};

export default YoloPopup;
