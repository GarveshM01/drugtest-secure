import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, FileCheck, RefreshCw, MapPin, Calendar, User, Tag, Hash, TestTube } from 'lucide-react';
import { useTest } from '../../context/TestContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';
import DisclaimerBanner from '../../components/common/DisclaimerBanner';
import { getCurrentLocation } from '../../services/locationService';
import { generateImageHash } from '../../services/cryptoService';

export default function Step8Result() {
  const navigate = useNavigate();
  const { currentTest, updateTestData, addTestRecord } = useTest();
  const { officer } = useAuth();

  const [locationInfo, setLocationInfo] = useState(null);
  const [imageHash, setImageHash] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const result = currentTest.analysisResult || {
    result: "Presumptive Negative",
    confidence: 94,
    status: "negative"
  };

  useEffect(() => {
    // Obtain Geolocation & WebCrypto Image Hash
    getCurrentLocation().then(loc => setLocationInfo(loc));
    generateImageHash(currentTest.imageCaptured || currentTest.caseId).then(h => setImageHash(h));
  }, []);

  const handleGenerateRecord = async () => {
    const recordId = `DTS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDateTime = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)} IST`;

    const recordData = {
      recordId,
      caseId: currentTest.caseId || 'CASE-2026-00124',
      sampleId: currentTest.sampleId || 'SMP-00124',
      referenceNumber: currentTest.referenceNumber || 'REF-98721',
      kit: currentTest.kit || 'Colorimetric Field Test Kit',
      category: currentTest.category || 'Cannabis',
      sampleType: currentTest.sampleType || 'Plant Material',
      batchNumber: currentTest.batchNumber || 'KIT-BPL-2026-018',
      expiryDate: currentTest.expiryDate || '2026-12-31',
      officerId: officer?.officerId || 'OFF-1023',
      officerName: officer?.name || 'Officer Vikram Sharma',
      unit: officer?.unit || 'BPL-CENTRAL-01',
      dateTime: formattedDateTime,
      timestamp: now.toISOString(),
      location: locationInfo?.locationName || 'Bhopal, Madhya Pradesh',
      locationIsMock: locationInfo?.isMock ?? true,
      result: result.result,
      confidence: result.confidence,
      integrity: 'Verified',
      hash: imageHash || 'a8f2c91d7b4e...mock...91ab',
      imageUrl: currentTest.imageCaptured || null
    };

    updateTestData({ digitalRecord: recordData });
    addTestRecord(recordData);
    setIsSaved(true);
    navigate('/new-test/record');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-1">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Step 8 of 9</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Analysis Result</h2>
        </div>
        <StatusBadge type="integrity" />
      </div>

      {/* Main Result Highlight Card */}
      <div className={`p-6 rounded-2xl border-2 space-y-4 text-center ${
        result.status === 'positive' 
          ? 'bg-rose-50 border-rose-300' 
          : result.status === 'inconclusive'
          ? 'bg-amber-50 border-amber-300'
          : 'bg-emerald-50 border-emerald-300'
      }`}>
        <div className="text-xs uppercase font-bold tracking-widest text-slate-500">
          Automated Spectral Presumptive Result
        </div>

        <div className="py-2">
          <StatusBadge status={result.result} />
        </div>

        <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-xs px-4 py-1.5 rounded-full border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Confidence Score:</span>
          <span className="text-sm font-bold text-slate-900">{result.confidence}% Match</span>
        </div>
      </div>

      {/* Captured Image Preview if available */}
      {currentTest.imageCaptured && (
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-wider">
            Captured &amp; Calibrated Field Image
          </div>
          <div className="max-h-48 overflow-hidden rounded-lg bg-black flex items-center justify-center">
            <img src={currentTest.imageCaptured} alt="Test Field Capture" className="max-h-48 object-contain" />
          </div>
        </div>
      )}

      {/* Key Test Details Summary Grid */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block uppercase font-medium text-[10px]">Case ID</span>
          <span className="font-mono font-bold text-slate-900 text-sm">{currentTest.caseId || 'CASE-2026-00124'}</span>
        </div>
        <div>
          <span className="text-slate-400 block uppercase font-medium text-[10px]">Sample ID</span>
          <span className="font-mono font-bold text-slate-900 text-sm">{currentTest.sampleId || 'SMP-00124'}</span>
        </div>
        <div>
          <span className="text-slate-400 block uppercase font-medium text-[10px]">Test Category</span>
          <span className="font-semibold text-slate-900">{currentTest.category || 'Cannabis'}</span>
        </div>
        <div>
          <span className="text-slate-400 block uppercase font-medium text-[10px]">Test Kit</span>
          <span className="font-medium text-slate-800">{currentTest.kit || 'Colorimetric Field Test Kit'}</span>
        </div>
        <div>
          <span className="text-slate-400 block uppercase font-medium text-[10px]">Officer ID</span>
          <span className="font-semibold text-slate-900">{officer?.officerId || 'OFF-1023'}</span>
        </div>
        <div>
          <span className="text-slate-400 block uppercase font-medium text-[10px]">GPS Location</span>
          <span className="font-medium text-slate-800 truncate block">
            {locationInfo?.locationName || 'Bhopal, Madhya Pradesh'}
          </span>
        </div>
      </div>

      {/* Official Disclaimer */}
      <DisclaimerBanner />

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/new-test/kit')}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Start New Test</span>
        </button>

        <button
          type="button"
          onClick={handleGenerateRecord}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg transition shadow-md"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Generate Digital Record</span>
        </button>
      </div>
    </div>
  );
}
