<<<<<<< HEAD
import React, { useState, useRef, useCallback } from "react";
=======
ï»¿import React, { useState, useRef, useCallback } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import useFileUpload from "../hooks/useFileUpload";

export default function Scanner({ onScanComplete }) {
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { uploadFile, uploading } = useFileUpload();

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsScanning(true);
      }
    } catch (err) {
      setError('Camera access denied or not available. Please check permissions.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  }, [stream]);

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (blob) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const file = new File([blob], `scan-${timestamp}.jpg`, { type: 'image/jpeg' });
        
        setCapturedImage(URL.createObjectURL(blob));
        
        // Upload for processing
        const result = await uploadFile(file, "/api/scanner/process", {
          timestamp,
          processOCR: true,
          detectObjects: true
        });

        if (result.ok && onScanComplete) {
          onScanComplete({
            file,
            imageUrl: URL.createObjectURL(blob),
            processedData: result.data,
            timestamp
          });
        }
      }
    }, 'image/jpeg', 0.9);
  }, [uploadFile, onScanComplete]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    if (!isScanning) {
      startCamera();
    }
  }, [isScanning, startCamera]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Scanner</h2>
        
        {/* Camera View */}
        <div className="relative mb-6">
          {!isScanning && !capturedImage && (
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Ready to scan documents</p>
              <button
                onClick={startCamera}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Start Camera
              </button>
            </div>
          )}

          {isScanning && (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg"
                style={{ maxHeight: '500px' }}
              />
              
              {/* Scanning Overlay */}
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>
              </div>

              {/* Scanning Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <button
                  onClick={captureImage}
                  disabled={uploading}
                  className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 disabled:opacity-50 shadow-lg"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-gray-600 text-white p-4 rounded-full hover:bg-gray-700 shadow-lg"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="relative">
              <img
                src={capturedImage}
                alt="Captured document"
                className="w-full rounded-lg shadow-lg"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
              
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="bg-white p-6 rounded-lg text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                    <p className="text-gray-700 font-medium">Processing scan...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hidden canvas for image capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Scanner Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {capturedImage && !uploading && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={retakePhoto}
              className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
            >
              Retake Photo
            </button>
            <button
              onClick={() => {
                // Download the captured image
                const a = document.createElement('a');
                a.href = capturedImage;
                a.download = `document-scan-${new Date().toISOString().slice(0, 19)}.jpg`;
                a.click();
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Download Image
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Scanning Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
<<<<<<< HEAD
            <li> Ensure good lighting for best results</li>
            <li> Hold the document flat and straight</li>
            <li> Position the entire document within the frame</li>
            <li> Avoid shadows and glare on the document</li>
            <li> Use a contrasting background (e.g., dark document on light surface)</li>
            <li> Ensure good lighting for best results</li>
            <li> Hold the document flat and straight</li>
            <li> Position the entire document within the frame</li>
            <li> Avoid shadows and glare on the document</li>
            <li> Use a contrasting background (e.g., dark document on light surface)</li>
=======
            <li> Ensure good lighting for best results</li>
            <li> Hold the document flat and straight</li>
            <li> Position the entire document within the frame</li>
            <li> Avoid shadows and glare on the document</li>
            <li> Use a contrasting background (e.g., dark document on light surface)</li>
            <li> Ensure good lighting for best results</li>
            <li> Hold the document flat and straight</li>
            <li> Position the entire document within the frame</li>
            <li> Avoid shadows and glare on the document</li>
            <li> Use a contrasting background (e.g., dark document on light surface)</li>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
          </ul>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

