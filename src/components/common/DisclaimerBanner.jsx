import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DisclaimerBanner({ compact = false }) {
  return (
    <div className={`bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-amber-900 ${compact ? 'text-xs' : 'text-sm'}`}>
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-900 text-xs tracking-wider uppercase">Official Presumptive Test Disclaimer</h4>
          <p className="mt-1 leading-relaxed text-amber-800">
            This digital analysis provides a <strong>presumptive field-test result</strong> based on visual colourimetric calibration. 
            It <strong>does NOT replace official laboratory confirmatory testing</strong> (e.g., GC-MS / LC-MS). 
            Confirmatory laboratory evidence must be submitted for formal legal proceedings.
          </p>
        </div>
      </div>
    </div>
  );
}
