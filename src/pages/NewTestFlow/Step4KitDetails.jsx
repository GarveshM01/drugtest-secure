import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldAlert, Calendar, Barcode, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useTest } from '../../context/TestContext';

export default function Step4KitDetails() {
  const navigate = useNavigate();
  const { currentTest, updateTestData } = useTest();

  // Set realistic default future expiry date (e.g. 2026-12-31) or current value
  const defaultBatch = currentTest.batchNumber || 'KIT-BPL-2026-018';
  const defaultExpiry = currentTest.expiryDate || '2026-12-31';
  const defaultTestType = currentTest.testType || 'Colorimetric Screening';

  const [batchNumber, setBatchNumber] = useState(defaultBatch);
  const [expiryDate, setExpiryDate] = useState(defaultExpiry);
  const [testType, setTestType] = useState(defaultTestType);
  const [error, setError] = useState('');

  // Expiry check logic
  const isExpired = expiryDate ? new Date(expiryDate) < new Date() : false;

  const handleContinue = (e) => {
    e.preventDefault();
    if (!batchNumber.trim()) {
      setError('Please enter the kit batch number.');
      return;
    }
    if (!expiryDate) {
      setError('Please specify the kit expiry date.');
      return;
    }

    updateTestData({
      batchNumber: batchNumber.trim(),
      expiryDate,
      testType
    });
    navigate('/new-test/instructions');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-2">
          <Barcode className="w-3.5 h-3.5" />
          <span>Step 4 of 9</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Kit Details & Batch Verification</h2>
        <p className="text-sm text-slate-500 mt-1">
          Verify reagent lot credentials and check chemical expiration status.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      {isExpired && (
        <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-amber-900">Kit Expiry Warning</h4>
            <p className="mt-0.5">
              The selected test kit expiry date ({expiryDate}) has passed. Using expired reagent kits may lead to false results or inconclusive colour analysis.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleContinue} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Kit Batch Number *
          </label>
          <div className="relative">
            <Barcode className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              placeholder="e.g. KIT-BPL-2026-018"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Expiration Date *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Testing Methodology
            </label>
            <input
              type="text"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              readOnly
            />
          </div>
        </div>

        {/* Selected Kit Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex justify-between items-center">
          <div>
            <span className="text-slate-400 block font-sans text-[10px]">Active Kit:</span>
            <strong className="text-slate-800 font-medium">{currentTest.kit || 'Colorimetric Field Test Kit'}</strong>
          </div>
          <div>
            <span className="text-slate-400 block font-sans text-[10px]">Category:</span>
            <strong className="text-slate-800 font-medium">{currentTest.category || 'Cannabis'}</strong>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/new-test/sample')}
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
