import React, { useState, useMemo } from 'react';
import { Search, Filter, History, Eye, ShieldCheck, FileText, Download, X } from 'lucide-react';
import { useTest } from '../context/TestContext';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import DisclaimerBanner from '../components/common/DisclaimerBanner';

export default function HistoryPage() {
  const { testHistory } = useTest();

  const [searchTerm, setSearchTerm] = useState('');
  const [resultFilter, setResultFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Categories list for filter dropdown
  const categories = useMemo(() => {
    const set = new Set(testHistory.map((r) => r.category).filter(Boolean));
    return Array.from(set);
  }, [testHistory]);

  // Filtered Records
  const filteredRecords = useMemo(() => {
    return testHistory.filter((record) => {
      // Text search match (Record ID, Case ID, Sample ID, Officer ID)
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        record.recordId?.toLowerCase().includes(term) ||
        record.caseId?.toLowerCase().includes(term) ||
        record.sampleId?.toLowerCase().includes(term) ||
        record.officerId?.toLowerCase().includes(term) ||
        record.referenceNumber?.toLowerCase().includes(term);

      // Result filter match
      const resLower = (record.result || '').toLowerCase();
      let matchesResult = true;
      if (resultFilter === 'POSITIVE') matchesResult = resLower.includes('positive');
      if (resultFilter === 'NEGATIVE') matchesResult = resLower.includes('negative');
      if (resultFilter === 'INCONCLUSIVE') matchesResult = resLower.includes('inconclusive');

      // Category filter match
      const matchesCategory = categoryFilter === 'ALL' || record.category === categoryFilter;

      return matchesSearch && matchesResult && matchesCategory;
    });
  }, [testHistory, searchTerm, resultFilter, categoryFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setResultFilter('ALL');
    setCategoryFilter('ALL');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-1">
              <History className="w-3.5 h-3.5" />
              <span>Audit Records</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Searchable Test History</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Query and inspect verified digital test records logged across units.
            </p>
          </div>

          <div className="text-xs font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700">
            Total Records: <strong>{testHistory.length}</strong>
          </div>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Record, Case, Sample, or Officer ID..."
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Result Filter */}
          <div className="md:col-span-3">
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            >
              <option value="ALL">All Results</option>
              <option value="NEGATIVE">Presumptive Negative</option>
              <option value="POSITIVE">Presumptive Positive</option>
              <option value="INCONCLUSIVE">Inconclusive</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            >
              <option value="ALL">All Substance Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {(searchTerm || resultFilter !== 'ALL' || categoryFilter !== 'ALL') && (
            <div className="md:col-span-1 flex items-center justify-center">
              <button
                onClick={clearFilters}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition"
                title="Reset Filters"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No matching test records found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search terms or filter criteria.</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Record ID</th>
                    <th className="px-6 py-3.5">Case / Sample</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Result</th>
                    <th className="px-6 py-3.5">Officer</th>
                    <th className="px-6 py-3.5">Date &amp; Time</th>
                    <th className="px-6 py-3.5">Integrity</th>
                    <th className="px-6 py-3.5 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((record) => (
                    <tr 
                      key={record.recordId} 
                      onClick={() => setSelectedRecord(record)}
                      className="hover:bg-slate-50/90 cursor-pointer transition"
                    >
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
                      <td className="px-6 py-4 text-xs text-slate-700">
                        <div className="font-semibold">{record.officerId}</div>
                        <div className="text-[10px] text-slate-400">{record.unit}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600">
                        {record.dateTime}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge type="integrity" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(record);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <div
                  key={record.recordId}
                  onClick={() => setSelectedRecord(record)}
                  className="p-4 space-y-2 hover:bg-slate-50 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900">{record.recordId}</span>
                    <StatusBadge status={record.result} />
                  </div>
                  <div className="grid grid-cols-2 text-xs text-slate-600 gap-1 pt-1">
                    <div>Case: <strong className="text-slate-800">{record.caseId}</strong></div>
                    <div>Sample: <strong className="text-slate-800">{record.sampleId}</strong></div>
                    <div>Category: <strong>{record.category}</strong></div>
                    <div>Officer: <strong>{record.officerId}</strong></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{record.dateTime}</span>
                    <span className="text-blue-600 font-semibold flex items-center space-x-1">
                      <span>View Record</span>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Record Modal Dialog */}
      <Modal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title={`Digital Record: ${selectedRecord?.recordId || ''}`}
      >
        {selectedRecord && (
          <div className="space-y-4 text-slate-800 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <StatusBadge status={selectedRecord.result} />
              <StatusBadge type="integrity" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Record ID</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{selectedRecord.recordId}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Confidence</span>
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
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Test Kit</span>
                <span className="font-medium">{selectedRecord.kit}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Batch Number</span>
                <span className="font-mono">{selectedRecord.batchNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Officer & Unit</span>
                <span className="font-semibold">{selectedRecord.officerId} ({selectedRecord.unit})</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium text-[10px]">Timestamp</span>
                <span className="font-medium">{selectedRecord.dateTime}</span>
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
