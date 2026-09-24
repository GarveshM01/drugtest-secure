import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, CheckCircle2, Loader2, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { useTest } from '../../context/TestContext';
import { analyzeTestImage } from '../../services/analysisService';

export default function Step7Analysis() {
  const navigate = useNavigate();
  const { currentTest, updateTestData } = useTest();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);

  const steps = [
    "Image received",
    "Checking image quality",
    "Reference colour card detected",
    "Colour calibration",
    "Test area analysis",
    "Generating presumptive result"
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setActiveStepIndex(currentStep);
      } else {
        clearInterval(interval);
        // Execute centralized mock analysis function
        analyzeTestImage(currentTest).then((res) => {
          setResultData(res);
          setIsCompleted(true);
          updateTestData({ analysisResult: res });
          // Automatically proceed to result page after brief pause
          setTimeout(() => {
            navigate('/new-test/result');
          }, 800);
        });
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-xs mb-1">
          {isCompleted ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          ) : (
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          )}
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          {isCompleted ? 'Analysis Complete' : 'Analyzing Test Image'}
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Calibrating captured pixels against reference colour card standards...
        </p>
      </div>

      {/* Progress Steps Animation */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
        {steps.map((stepText, idx) => {
          const isDone = idx < activeStepIndex || isCompleted;
          const isCurrent = idx === activeStepIndex && !isCompleted;

          return (
            <div
              key={stepText}
              className={`flex items-center justify-between p-3 rounded-xl transition ${
                isCurrent
                  ? 'bg-white border border-blue-300 shadow-xs text-blue-900 font-semibold'
                  : isDone
                  ? 'bg-white/60 text-slate-800 font-medium'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm">{stepText}</span>
              </div>

              {isDone && (
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Official Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center space-x-2">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Prototype analysis — not a laboratory confirmation.</strong> All presumptive field indications require laboratory verification for legal evidentiary status.
        </span>
      </div>
    </div>
  );
}
