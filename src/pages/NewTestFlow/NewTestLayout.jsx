import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import StepIndicator, { STEPS } from '../../components/common/StepIndicator';

export default function NewTestLayout() {
  const location = useLocation();

  // Determine current step index from current path
  const currentStepObj = STEPS.find((s) => location.pathname === s.path) || STEPS[0];

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col pb-16 md:pb-8">
      {/* Step Indicator Top Bar */}
      <StepIndicator currentStepNumber={currentStepObj.step} />

      {/* Main Container for Step Pages */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
