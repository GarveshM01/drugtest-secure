import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, RefreshCw, Check, ArrowLeft, Upload, AlertCircle, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { useTest } from '../../context/TestContext';

export default function Step6Camera() {
  const navigate = useNavigate();
  const { currentTest, updateTestData } = useTest();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [capturedImage, setCapturedImage] = useState(currentTest.imageCaptured || null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Initialize browser camera stream
  const startCamera = async () => {
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Browser mediaDevices API not supported on this context.");
      }

      // Try facingMode environment (rear camera on mobile)
      const constraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Camera init failed:", err);
      let msg = "Could not access device camera.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        msg = "Camera permission was denied. Please allow camera access in browser settings or upload a test photo below.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        msg = "No camera hardware detected. Please use the fallback file upload option below.";
      } else if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        msg = "Camera access requires HTTPS or localhost context. Please use the file upload fallback below.";
      } else {
        msg = `Camera unavailable (${err.message || 'Error'}). Use file fallback below.`;
      }
      setCameraError(msg);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (!capturedImage) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, []);

  // Capture frame from live video feed onto canvas
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
    stopCamera();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Fallback file upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedImage(event.target?.result);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const handleUsePhoto = () => {
    if (!capturedImage) return;
    updateTestData({ imageCaptured: capturedImage });
    stopCamera();
    navigate('/new-test/analysis');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>Step 6 of 9</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Real Camera Capture</h2>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600">
        Place the test kit chemical reaction area and reference colour card inside the central calibration frame.
      </p>

      {/* Hidden Canvas for capture rendering */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera Viewport / Captured Image View */}
      <div className="relative bg-slate-950 rounded-2xl overflow-hidden aspect-[4/3] max-h-[460px] flex items-center justify-center border border-slate-800 shadow-inner">
        {capturedImage ? (
          // Captured Image Preview
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img 
              src={capturedImage} 
              alt="Captured Field Test" 
              className="w-full h-full object-contain"
            />
            <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
              <Check className="w-4 h-4" />
              <span>Photo Captured</span>
            </div>
          </div>
        ) : (
          // Live Video Stream
          <div className="relative w-full h-full flex items-center justify-center">
            {cameraError ? (
              <div className="p-6 text-center text-slate-300 space-y-3 max-w-sm">
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="font-bold text-white text-sm">Camera Stream Notice</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cameraError}</p>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Calibration Visual Framing Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                  {/* Top Guide Text */}
                  <div className="bg-slate-900/80 backdrop-blur-xs text-slate-100 text-xs text-center py-2 px-4 rounded-xl border border-slate-700/60 font-medium animate-target-pulse">
                    Align test kit &amp; reference colour card inside box
                  </div>

                  {/* Central Reticle Box */}
                  <div className="flex-1 flex items-center justify-center my-2">
                    <div className="w-[85%] h-[80%] border-2 border-dashed border-blue-400/90 rounded-2xl relative shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center">
                      <div className="absolute top-2 left-2 text-[10px] uppercase font-mono font-bold bg-blue-600/80 text-white px-2 py-0.5 rounded">
                        Ref Card Target
                      </div>
                      <div className="absolute bottom-2 right-2 text-[10px] uppercase font-mono font-bold bg-slate-900/80 text-slate-200 px-2 py-0.5 rounded">
                        Reagent Target
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-center text-slate-300 font-mono bg-slate-900/70 py-1 rounded-lg">
                    Auto Lighting &amp; Calibration Active
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Control Buttons Bar */}
      <div className="space-y-3">
        {capturedImage ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleRetake}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition flex items-center justify-center space-x-2 border border-slate-300"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Photo</span>
            </button>
            <button
              onClick={handleUsePhoto}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition shadow-md flex items-center justify-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Use This Photo</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            {!cameraError && (
              <button
                onClick={handleCapture}
                className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg flex items-center justify-center space-x-2 text-sm"
              >
                <Camera className="w-5 h-5" />
                <span>Capture Field Photo</span>
              </button>
            )}

            {/* Fallback File Upload Input */}
            <label className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition cursor-pointer text-sm flex items-center justify-center space-x-2 border border-slate-700">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Upload Photo / Gallery Fallback</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            stopCamera();
            navigate('/new-test/instructions');
          }}
          className="flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {capturedImage && (
          <button
            type="button"
            onClick={handleUsePhoto}
            className="flex items-center space-x-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition shadow-md"
          >
            <span>Proceed to Analysis</span>
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
