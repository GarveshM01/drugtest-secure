import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers, CheckCircle2, Info } from 'lucide-react';
import { useTest } from '../../context/TestContext';
import { SUBSTANCE_CATEGORIES } from '../../services/mockData';

export default function Step2Category() {
  const navigate = useNavigate();
  const { currentTest, updateTestData } = useTest();

  const [selectedCategory, setSelectedCategory] = useState(currentTest.category || '');
  const [error, setError] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      setError('Please select a target substance category.');
      return;
    }
    updateTestData({ category: selectedCategory });
    navigate('/new-test/sample');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Step 2 of 9</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Select Substance / Test Category</h2>
        <p className="text-sm text-slate-500 mt-1">
          Choose the suspected target substance category to apply corresponding colour threshold algorithms.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start space-x-2">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <span>
          <strong>Prototype Note:</strong> These are high-level test categories. Production deployments will map directly to validated kit-specific colourimetric test strips and chemical reagent matrixes.
        </span>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      {/* Category Selection List */}
      <div className="space-y-3">
        {SUBSTANCE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.name);
                setError('');
              }}
              className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 text-sm">{cat.name}</div>
                <div className="text-xs text-slate-500">{cat.description}</div>
              </div>

              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
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
          onClick={() => navigate('/new-test/kit')}
          className="flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedCategory}
          className={`flex items-center space-x-2 text-sm font-semibold px-6 py-2.5 rounded-lg transition shadow-md ${
            selectedCategory
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
