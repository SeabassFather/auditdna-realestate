<<<<<<< HEAD
import React, { useState, useRef, useCallback, useEffect } from "react";
=======
ï»¿import React, { useState, useRef, useCallback, useEffect } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import useFileUpload from "../hooks/useFileUpload";

export default function FacialRecognition({ onVerificationComplete, initialMode = "verification" }) {
  const [mode, setMode] = useState(initialMode);
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { uploadFile, uploading } = useFileUpload();

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
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
    setIsActive(false);
    setCountdown(0);
  }, [stream]);

  const startCountdown = useCallback(() => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          capturePhoto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (blob) {
        const timestamp = new Date().toISOString();
        const file = new File([blob], `facial-recognition-${timestamp}.jpg`, { type: 'image/jpeg' });

        setCapturedPhoto(URL.createObjectURL(blob));

        try {
          const result = await uploadFile(file, "/api/facial-recognition/verify", {
            mode,
            timestamp,
            detectLiveness: true,
            extractFeatures: true
          });
          if (result.ok) {
            setVerificationResult(result.data);
            if (onVerificationComplete) {
              onVerificationComplete({
                success: result.data.verified || false,
                confidence: result.data.confidence || 0,
                features: result.data.features,
                file,
                imageUrl: URL.createObjectURL(blob),
                timestamp
              });
            }
          }
        } catch (err) {
          setError('Facial recognition processing failed. Please try again.');
          console.error('Facial recognition error:', err);
        }
      }
    }, 'image/jpeg', 0.9);
  }, [uploadFile, onVerificationComplete, mode]);

  const retakePhoto = useCallback(() => {
    setCapturedPhoto(null);
    setVerificationResult(null);
    if (!isActive) {
      startCamera();
    }
  }, [isActive, startCamera]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Facial Recognition</h2>

        {/* Mode Selection */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setMode("verification")}
              className={`px-4 py-2 rounded-lg font-medium ${
                mode === "verification"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Identity Verification
            </button>
            <button
              onClick={() => setMode("enrollment")}
              className={`px-4 py-2 rounded-lg font-medium ${
                mode === "enrollment"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Face Enrollment
            </button>
          </div>
        </div>

        {/* Camera View */}
        <div className="relative mb-6">
          {!isActive && !capturedPhoto && (
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                {mode === "verification"
                  ? "Ready to verify your identity"
                  : "Ready to enroll your face"}
              </p>
              <button
                onClick={startCamera}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Start Camera
              </button>
            </div>
          )}

          {isActive && (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg"
                style={{ maxHeight: '400px', transform: 'scaleX(-1)' }}
              />
              {/* Face Detection Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-80 border-2 border-blue-500 rounded-full relative">
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                </div>
              </div>
              {/* Countdown Display */}
              {countdown > 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white">{countdown}</div>
                </div>
              )}
              {/* Camera Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {countdown === 0 && (
                  <>
                    <button
                      onClick={startCountdown}
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
                  </>
                )}
              </div>
            </div>
          )}

          {capturedPhoto && (
            <div className="relative">
              <img
                src={capturedPhoto}
                alt="Captured face"
                className="w-full rounded-lg shadow-lg"
                style={{ maxHeight: '400px', objectFit: 'contain', transform: 'scaleX(-1)' }}
              />
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="bg-white p-6 rounded-lg text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                    <p className="text-gray-700 font-medium">Processing facial recognition...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Verification Results */}
        {verificationResult && (
          <div className={`mb-6 p-4 rounded-lg border ${
            verificationResult.verified
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {verificationResult.verified ? (
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-lg font-semibold ${
                  verificationResult.verified ? 'text-green-800' : 'text-red-800'
                }`}>
                  {verificationResult.verified ? 'Verification Successful' : 'Verification Failed'}
                </h3>
                <p className={`text-sm ${
                  verificationResult.verified ? 'text-green-700' : 'text-red-700'
                }`}>
                  Confidence: {Math.round((verificationResult.confidence || 0) * 100)}%
                </p>
                {verificationResult.message && (
                  <p className={`text-sm mt-1 ${
                    verificationResult.verified ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {verificationResult.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

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
                <h3 className="text-sm font-medium text-red-800">Recognition Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {capturedPhoto && !uploading && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={retakePhoto}
              className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
            >
              Retake Photo
            </button>
            {verificationResult?.verified && (
              <button
                onClick={() => {
                  alert('Identity verified successfully!');
                  // You can add additional logic here
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Continue
              </button>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Recognition Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
<<<<<<< HEAD
            <li> Look directly at the camera</li>
            <li> Ensure your face is well-lit and clearly visible</li>
            <li> Remove sunglasses, hats, or masks</li>
            <li> Position your face within the oval guide</li>
            <li> Keep your expression neutral</li>
            <li> Hold still during the countdown</li>
            <li> Look directly at the camera</li>
            <li> Ensure your face is well-lit and clearly visible</li>
            <li> Remove sunglasses, hats, or masks</li>
            <li> Position your face within the oval guide</li>
            <li> Keep your expression neutral</li>
            <li> Hold still during the countdown</li>
=======
            <li> Look directly at the camera</li>
            <li> Ensure your face is well-lit and clearly visible</li>
            <li> Remove sunglasses, hats, or masks</li>
            <li> Position your face within the oval guide</li>
            <li> Keep your expression neutral</li>
            <li> Hold still during the countdown</li>
            <li> Look directly at the camera</li>
            <li> Ensure your face is well-lit and clearly visible</li>
            <li> Remove sunglasses, hats, or masks</li>
            <li> Position your face within the oval guide</li>
            <li> Keep your expression neutral</li>
            <li> Hold still during the countdown</li>
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

