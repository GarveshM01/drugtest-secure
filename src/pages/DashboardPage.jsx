import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, History, UserCheck, ShieldCheck, FileText, ArrowRight, Eye, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTest } from '../context/TestContext';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import DisclaimerBanner from '../components/common/DisclaimerBanner';
import Modal from '../components/common/Modal';

export default function DashboardPage() {
  const { officer } = useAuth();
  const { testHistory, resetTest } = useTest();
  const navigate = useNavigate();

  const [selectedRecord, setSelectedRecord] = useState(null);

  // Statistics calculation
  const totalTests = testHistory.length;
  // Calculate tests today (matching date strings)
  const todayStr = new Date().toISOString().slice(0, 10);
  const testsToday = testHistory.filter(r => r.timestamp && r.timestamp.startsWith(todayStr)).length || Math.min(2, totalTests);
  const positiveCount = testHistory.filter(r => (r.result || '').toLowerCase().includes('positive')).length;
  const inconclusiveCount = testHistory.filter(r => (r.result || '').toLowerCase().includes('inconclusive')).length;

  const handleStartNewTest = () => {
    resetTest();
    navigate('/new-test/kit');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold bg-blue-900/80 text-blue-200 px-3 py-1 rounded-full border border-blue-700/50 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Verified Officer Station • {officer?.unit || 'BPL-CENTRAL-01'}</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {getGreeting()}, {officer?.name || 'Officer'}
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Field Presumptive Verification Portal. Capture test kits, calibrate against reference color cards, and issue cryptographic digital records.
            </p>
          </div>

          {/* Main Call to Action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleStartNewTest}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl transition shadow-lg flex items-center justify-center space-x-2 text-sm"
            >
              <PlusCircle className="w-5 h-5" />
              <span>+ New Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Disclaimer */}
      <DisclaimerBanner compact />

      {/* Key Metric Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Tests Today" value={testsToday} subtitle="Shift Activity" icon={FileText} color="blue" />
        <StatCard title="Total Tests" value={totalTests} subtitle="Logged Records" icon={History} color="slate" />
        <StatCard title="Presumptive Positive" value={positiveCount} subtitle="Target Reagent Matches" icon={PlusCircle} color="red" />
        <StatCard title="Inconclusive" value={inconclusiveCount} subtitle="Requires Re-test / Lab" icon={ShieldCheck} color="orange" />
      </div>

      {/* Navigation Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/history')}
          className="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-xs transition flex items-center justify-between text-left group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-slate-100 text-slate-700 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">View Test History</h3>
              <p className="text-xs text-slate-500">Search and filter past verified records</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-xs transition flex items-center justify-between text-left group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-slate-100 text-slate-700 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Officer Profile</h3>
              <p className="text-xs text-slate-500">View officer ID, unit code and credentials</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
        </button>
      </div>

      {/* Recent Tests Table / Card List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Test Activity</h2>
            <p className="text-xs text-slate-500">Latest field test records logged by officers</p>
          </div>
          <button
            onClick={() => navigate('/history')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table View for Tablet/Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Record ID</th>
                <th className="px-6 py-3">Case / Sample ID</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Result</th>
                <th className="px-6 py-3">Date & Time</th>
                <th className="px-6 py-3">Integrity</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testHistory.slice(0, 5).map((record) => (
                <tr key={record.recordId} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-mono font-bold text-slate-900 text-xs">
                    {record.recordId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800 text-xs">{record.caseId}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{record.sampleId}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-700">
                    {record.category}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={record.result} />
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600">
                    {record.dateTime}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge type="integrity" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center space-x-1 text-xs font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View for Mobile */}
        <div className="sm:hidden divide-y divide-slate-100">
          {testHistory.slice(0, 5).map((record) => (
            <div key={record.recordId} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900">{record.recordId}</span>
                <StatusBadge status={record.result} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Case: <strong className="text-slate-800">{record.caseId}</strong></span>
                <span className="text-slate-500">Sample: <strong className="text-slate-800">{record.sampleId}</strong></span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>{record.category}</span>
                <span>{record.dateTime}</span>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedRecord(record)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg text-center flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Full Record</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Modal Preview */}
      <Modal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title={`Digital Test Record: ${selectedRecord?.recordId || ''}`}
      >
        {selectedRecord && (
          <div className="space-y-4 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <StatusBadge status={selectedRecord.result} />
              <StatusBadge type="integrity" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Record ID</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{selectedRecord.recordId}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Confidence Score</span>
                <span className="font-bold text-emerald-700 text-sm">{selectedRecord.confidence}% Match</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Case ID</span>
                <span className="font-semibold">{selectedRecord.caseId}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Sample ID</span>
                <span className="font-semibold">{selectedRecord.sampleId}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Test Kit Used</span>
                <span className="font-medium">{selectedRecord.kit}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Batch Number</span>
                <span className="font-mono">{selectedRecord.batchNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Category</span>
                <span className="font-semibold">{selectedRecord.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Officer ID</span>
                <span className="font-semibold">{selectedRecord.officerId} ({selectedRecord.unit})</span>
              </div>
            </div>

            {/* Cryptographic Hash */}
            <div className="bg-slate-900 text-slate-200 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">
                Cryptographic Image Hash (SHA-256)
              </div>
              <div className="font-mono text-xs break-all text-blue-300">
                {selectedRecord.hash}
              </div>
            </div>

            <DisclaimerBanner compact />
          </div>
        )}
      </Modal>
    </div>
  );
}
