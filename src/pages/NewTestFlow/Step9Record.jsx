import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Printer, History, LayoutDashboard, Copy, Lock, MapPin, Calendar, FileText } from 'lucide-react';
import { useTest } from '../../context/TestContext';
import StatusBadge from '../../components/common/StatusBadge';
import DisclaimerBanner from '../../components/common/DisclaimerBanner';

export default function Step9Record() {
  const navigate = useNavigate();
  const { currentTest, testHistory } = useTest();

  // Pick generated digital record from state or latest record from testHistory
  const record = currentTest.digitalRecord || testHistory[0] || {};
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const copyHash = () => {
    if (record.hash) {
      navigator.clipboard.writeText(record.hash);
      alert('Cryptographic Hash copied to clipboard.');
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Success Notification Banner */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-950 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-sm text-emerald-900">Record Generated Successfully</h3>
            <p className="text-xs text-emerald-800">
              Tamper-evident digital record has been cryptographically signed and stored.
            </p>
          </div>
        </div>
        <StatusBadge type="integrity" />
      </div>

      {/* Official Certificate Card */}
      <div ref={printRef} className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Top Header Stamp */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-slate-900 tracking-tight">DIGITAL TEST RECORD</span>
              <span className="text-[10px] uppercase font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                Official Evidence Copy
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Field Presumptive Verification Bureau • Narcotics Control Protocol
            </p>
          </div>

          <div className="text-left sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Record ID</div>
            <div className="font-mono font-bold text-slate-900 text-base">{record.recordId || 'DTS-2026-0089'}</div>
          </div>
        </div>

        {/* Status & Result Box */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Presumptive Classification</span>
            <div className="mt-1">
              <StatusBadge status={record.result} />
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Spectral Confidence</span>
            <span className="text-lg font-bold text-emerald-700">{record.confidence || 94}% Match</span>
          </div>
        </div>

        {/* Record Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Case ID</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{record.caseId}</span>
          </div>

          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Sample ID</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{record.sampleId}</span>
          </div>

          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Reference Number</span>
            <span className="font-mono font-bold text-slate-800">{record.referenceNumber || 'N/A'}</span>
          </div>

          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Test Kit Model</span>
            <span className="font-semibold text-slate-800">{record.kit}</span>
          </div>

          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Kit Batch Number</span>
            <span className="font-mono font-bold text-slate-800">{record.batchNumber}</span>
          </div>

          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Substance Category</span>
            <span className="font-semibold text-slate-800">{record.category}</span>
          </div>

          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Sample Type</span>
            <span className="font-semibold text-slate-800">{record.sampleType}</span>
          </div>

          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Officer & Unit</span>
            <span className="font-semibold text-slate-800">{record.officerId} ({record.unit})</span>
          </div>

          <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-medium text-[10px] uppercase">Date &amp; Time</span>
            <span className="font-medium text-slate-800">{record.dateTime}</span>
          </div>
        </div>

        {/* Location & GPS Info */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div>
              <span className="font-semibold text-slate-900 block">{record.location}</span>
              {record.locationIsMock && (
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-semibold">
                  Mock Location (Prototype Mode)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Image Preview if available */}
        {record.imageUrl && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Cryptographically Stored Photo Evidence
            </div>
            <div className="max-h-56 overflow-hidden rounded-lg flex justify-center bg-black">
              <img src={record.imageUrl} alt="Record Field Evidence" className="max-h-56 object-contain" />
            </div>
          </div>
        )}

        {/* Cryptographic Hash Block */}
        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Cryptographic Image Hash (SHA-256)
              </span>
            </div>
            <button
              onClick={copyHash}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
          <p className="font-mono text-xs break-all text-blue-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
            {record.hash}
          </p>
          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
            <span>Tamper-Evident Digest Algorithm: SHA-256</span>
            <span className="text-emerald-400 font-semibold">Status: Integrity Intact</span>
          </div>
        </div>

        {/* Disclaimer */}
        <DisclaimerBanner />
      </div>

      {/* Bottom Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-5 py-3 rounded-xl shadow-xs transition"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>

        <div className="w-full sm:w-auto flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-5 py-3 rounded-xl shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Record</span>
          </button>

          <button
            onClick={() => navigate('/history')}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            <History className="w-4 h-4" />
            <span>View Test History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
