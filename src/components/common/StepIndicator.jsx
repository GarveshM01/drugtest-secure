import React from 'react';
import { Check } from 'lucide-react';

export const STEPS = [
  { step: 1, id: 'kit', title: 'Test Kit', path: '/new-test/kit' },
  { step: 2, id: 'category', title: 'Test Category', path: '/new-test/category' },
  { step: 3, id: 'sample', title: 'Sample Details', path: '/new-test/sample' },
  { step: 4, id: 'kit-details', title: 'Kit Details', path: '/new-test/kit-details' },
  { step: 5, id: 'instructions', title: 'Instructions', path: '/new-test/instructions' },
  { step: 6, id: 'camera', title: 'Capture', path: '/new-test/camera' },
  { step: 7, id: 'analysis', title: 'Analysis', path: '/new-test/analysis' },
  { step: 8, id: 'result', title: 'Result', path: '/new-test/result' },
  { step: 9, id: 'record', title: 'Digital Record', path: '/new-test/record' }
];

export default function StepIndicator({ currentStepNumber }) {
  const currentStepObj = STEPS.find(s => s.step === currentStepNumber) || STEPS[0];
  const progressPercent = Math.round((currentStepNumber / STEPS.length) * 100);

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-16 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto">
        {/* Mobile Header View */}
        <div className="flex items-center justify-between md:hidden mb-2">
          <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
            Step {currentStepNumber} of {STEPS.length}
          </span>
          <span className="text-xs font-bold text-slate-700">
            {currentStepObj.title}
          </span>
        </div>

        {/* Progress Bar for all screens */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
          <div 
            className="bg-blue-600 h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Desktop Step Dots */}
        <div className="hidden md:flex items-center justify-between relative">
          {STEPS.map((step) => {
            const isCompleted = step.step < currentStepNumber;
            const isCurrent = step.step === currentStepNumber;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    isCompleted
                      ? 'bg-blue-600 text-white'
                      : isCurrent
                      ? 'bg-slate-900 text-white ring-4 ring-blue-100 border border-blue-600'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.step}
                </div>
                <span className={`text-[11px] font-medium mt-1 text-center truncate max-w-[80px] ${
                  isCurrent ? 'text-slate-900 font-bold' : isCompleted ? 'text-blue-700' : 'text-slate-400'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
