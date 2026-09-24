import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ClipboardCheck, CheckSquare, Square, Lightbulb } from 'lucide-react';
import { useTest } from '../../context/TestContext';

export default function Step5Instructions() {
  const navigate = useNavigate();
  const { currentTest, updateTestData } = useTest();

  const [confirmed, setConfirmed] = useState(currentTest.instructionsConfirmed || false);

  const instructions = [
    { num: 1, text: "Perform the test using the existing field-testing kit chemical reagents." },
    { num: 2, text: "Wait for the specified reaction time according to the kit instructions (typically 60-120 seconds)." },
    { num: 3, text: "Place the official reference colour card directly beside the test ampoule/well." },
    { num: 4, text: "Ensure both the reactive test area and the reference colour card are clearly visible within the frame." },
    { num: 5, text: "Capture the image in good, indirect lighting without glare or shadow cast." },
    { num: 6, text: "Submit the captured photograph for automated colourimetric spectral analysis." }
  ];

  const handleContinue = () => {
    if (!confirmed) return;
    updateTestData({ instructionsConfirmed: true });
    navigate('/new-test/camera');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-2">
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>Step 5 of 9</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Field Procedure Instructions</h2>
        <p className="text-sm text-slate-500 mt-1">
          Follow standard operating protocol to ensure accurate digital colour calibration and legally verifiable testing.
        </p>
      </div>

      {/* Instructions Step List */}
      <div className="space-y-3">
        {instructions.map((inst) => (
          <div key={inst.num} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              {inst.num}
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {inst.text}
            </p>
          </div>
        ))}
      </div>

      {/* Tip Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-3">
        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold uppercase tracking-wider text-[10px] block text-amber-900">Calibration Tip</strong>
          <p className="mt-0.5">
            The reference colour card acts as a white-balance and lighting standard. Do not crop out or obscure the color reference blocks.
          </p>
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div 
        onClick={() => setConfirmed(!confirmed)}
        className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-center space-x-3 ${
          confirmed 
            ? 'bg-emerald-50/60 border-emerald-600 text-emerald-950' 
            : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-800'
        }`}
      >
        <div className="flex-shrink-0">
          {confirmed ? (
            <CheckSquare className="w-6 h-6 text-emerald-600" />
          ) : (
            <Square className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <label className="text-sm font-semibold cursor-pointer select-none">
          I confirm that the test was performed strictly according to the kit instructions and reference card guidelines.
        </label>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/new-test/kit-details')}
          className="flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!confirmed}
          className={`flex items-center space-x-2 text-sm font-semibold px-6 py-2.5 rounded-lg transition shadow-md ${
            confirmed
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Proceed to Camera</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
