import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileSpreadsheet, Tag, Hash, Package } from 'lucide-react';
import { useTest } from '../../context/TestContext';
import { SAMPLE_TYPES } from '../../services/mockData';

export default function Step3Sample() {
  const navigate = useNavigate();
  const { currentTest, updateTestData } = useTest();

  // Generate unique fallback IDs if starting fresh
  const defaultCaseId = currentTest.caseId || `CASE-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const defaultSampleId = currentTest.sampleId || `SMP-${Math.floor(10000 + Math.random() * 90000)}`;
  const defaultRefNum = currentTest.referenceNumber || `REF-${Math.floor(10000 + Math.random() * 90000)}`;

  const [caseId, setCaseId] = useState(defaultCaseId);
  const [sampleId, setSampleId] = useState(defaultSampleId);
  const [referenceNumber, setReferenceNumber] = useState(defaultRefNum);
  const [sampleType, setSampleType] = useState(currentTest.sampleType || 'Powder');
  const [error, setError] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (!caseId.trim()) {
      setError('Case ID is required.');
      return;
    }
    if (!sampleId.trim()) {
      setError('Sample ID is required.');
      return;
    }

    updateTestData({
      caseId: caseId.trim(),
      sampleId: sampleId.trim(),
      referenceNumber: referenceNumber.trim(),
      sampleType
    });
    navigate('/new-test/kit-details');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-2">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Step 3 of 9</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sample & Case Details</h2>
        <p className="text-sm text-slate-500 mt-1">
          Enter official case tracking identifiers. No personal identifiable information (PII) is recorded.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      <form onSubmit={handleContinue} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Case ID *
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                placeholder="e.g. CASE-2026-00124"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white font-mono transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sample ID *
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={sampleId}
                onChange={(e) => setSampleId(e.target.value)}
                placeholder="e.g. SMP-00124"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white font-mono transition"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Reference Number (Optional)
            </label>
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="e.g. REF-98721"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white font-mono transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Physical Sample Form / Type *
            </label>
            <div className="relative">
              <Package className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <select
                value={sampleType}
                onChange={(e) => setSampleType(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white transition appearance-none"
              >
                {SAMPLE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/new-test/category')}
            className="flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="flex items-center space-x-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg transition shadow-md"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
