import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './Popup.css';

const YoloPopup = ({ modelName, displayModelName, onClose }) => {
  const videoRef = useRef(null);
  const processedImageRef = useRef(null);
  const videoFileInput = useRef(null);
  const csvResults = useRef(null);
  const [ws, setWs] = useState(null);
  const [stream, setStream] = useState(null);
  const [csvLink, setCsvLink] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Checking system status, It may take up to a min...');
  const [isWaiting, setIsWaiting] = useState(true);
  const intervalRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const checkSystemStatus = async () => {
    try {
      let url;
      if (
        window.location.origin.includes('localhost') ||
        window.location.origin.includes('127.0.0.1') ||
        window.location.origin.includes('0.0.0.0')
      ) {
        url = `http://localhost:8000/status`;
      } else {
        url = `https://asia-south1-assisto-dev-52a1d.cloudfunctions.net/proxy-1`;
      }

      const response = await axios.get(url);
      if (response.data.status === 'running') {
        setIsReady(true);
        setLoadingMessage('Containers are up, ready to start stream...');
        setIsWaiting(false);
      } else {
        setLoadingMessage('System not ready, retrying...');
        setTimeout(checkSystemStatus, 5000);
      }
    } catch (error) {
      console.error('Error checking system status:', error.message);
      setLoadingMessage(`Error checking system status: ${error.message}, retrying...`);
      setTimeout(checkSystemStatus, 5000);
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
        websocketUrl = `ws://127.0.0.1:8000/ws/${modelName}`;
      } else {
        websocketUrl = `wss://flipgears-347795434098.asia-south1.run.app/ws/${modelName}`;
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

  const uploadVideo = async () => {
    const file = videoFileInput.current.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      const formData = new FormData();
      formData.append('file', file);
      setIsProcessing(true);  // Set loading state to true
      let url;
      if (
        window.location.origin.includes('localhost') ||
        window.location.origin.includes('127.0.0.1') ||
        window.location.origin.includes('0.0.0.0')
      ) {
        url = `http://localhost:8000/process_video/${modelName}`;
      } else {
        url = `https://flipgears-347795434098.asia-south1.run.app/process_video/${modelName}`;
      }

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
       
          const csvUrl = URL.createObjectURL(blob);
          setCsvLink(csvUrl);
         
        } else {
          alert('Error processing the video.');
        }
      } catch (error) {
        console.error('Error uploading video:', error);
        alert('Error uploading video.');
      }
      finally {
        setIsProcessing(false);  // Set loading state to false
      }
    } else {
      alert('File size exceeds 10 MB or no file selected.');
    }
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
        <h1>Real-Time {displayModelName} Detection</h1>
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
      <div className="upload-section">
        <h2>Upload Video:</h2>
        <input type="file" ref={videoFileInput} accept="video/*" />
        <button className="control-button" onClick={uploadVideo}>Upload and Process</button>
        <div ref={csvResults}></div>
      </div>
      {isProcessing && (
  <div className="loading-overlay">
    <div className="loading-spinner"></div>
  </div>
)}
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
