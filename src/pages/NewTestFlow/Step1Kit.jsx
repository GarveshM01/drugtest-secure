import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, TestTube, CheckCircle2 } from 'lucide-react';
import { useTest } from '../../context/TestContext';
import { TEST_KITS } from '../../services/mockData';

export default function Step1Kit() {
  const navigate = useNavigate();
  const { currentTest, updateTestData } = useTest();

  const [selectedKit, setSelectedKit] = useState(currentTest.kit || '');
  const [error, setError] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (!selectedKit) {
      setError('Please select a test kit to proceed.');
      return;
    }
    updateTestData({ kit: selectedKit });
    navigate('/new-test/category');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-2">
          <TestTube className="w-3.5 h-3.5" />
          <span>Step 1 of 9</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Select Test Kit</h2>
        <p className="text-sm text-slate-500 mt-1">
          Select the standardized field test kit being utilized for this substance verification.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      {/* Kit Selection List */}
      <div className="space-y-3">
        {TEST_KITS.map((kit) => {
          const isSelected = selectedKit === kit.name;
          return (
            <div
              key={kit.id}
              onClick={() => {
                setSelectedKit(kit.name);
                setError('');
              }}
              className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 text-base">{kit.name}</span>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                    {kit.code}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{kit.description}</p>
              </div>

              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition mt-0.5 ${
                isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
              }`}>
                {isSelected && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedKit}
          className={`flex items-center space-x-2 text-sm font-semibold px-6 py-2.5 rounded-lg transition shadow-md ${
            selectedKit
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
