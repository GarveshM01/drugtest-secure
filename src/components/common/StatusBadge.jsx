import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck } from 'lucide-react';

export default function StatusBadge({ status, type = 'result' }) {
  if (type === 'integrity') {
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Verified</span>
      </span>
    );
  }

  // Result badges:
  // Presumptive Negative -> Green for safe/negative
  // Presumptive Positive -> Red for positive target detected
  // Inconclusive -> Orange for inconclusive
  const normalized = (status || '').toLowerCase();

  if (normalized.includes('negative')) {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>PRESUMPTIVE NEGATIVE</span>
      </span>
    );
  }

  if (normalized.includes('positive')) {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
        <span>PRESUMPTIVE POSITIVE</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
      <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
      <span>INCONCLUSIVE</span>
    </span>
  );
}
