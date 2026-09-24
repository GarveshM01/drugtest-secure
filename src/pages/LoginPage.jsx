import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, KeyRound, Building2, User, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_OFFICER } from '../services/mockData';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [officerId, setOfficerId] = useState('');
  const [unit, setUnit] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleAutofill = () => {
    setOfficerId(DEMO_OFFICER.officerId);
    setUnit(DEMO_OFFICER.unit);
    setPin(DEMO_OFFICER.pin);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!officerId.trim()) {
      setError('Please enter your Officer ID.');
      return;
    }
    if (!unit.trim()) {
      setError('Please enter your Unit / Batch ID.');
      return;
    }
    if (!pin.trim()) {
      setError('Please enter your Security PIN.');
      return;
    }

    login(officerId, unit, pin);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-md w-full relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl mb-3">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">DrugTest Secure</h1>
          <p className="text-sm text-slate-400 mt-1">Field Presumptive Verification Portal</p>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-slate-800 text-blue-400 text-xs font-semibold border border-slate-700">
            SIH 2026 Prototype • Mobile-First Portal
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              Officer Authentication
            </h2>
            <button
              type="button"
              onClick={handleAutofill}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Auto-fill Demo</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Officer ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="e.g. OFF-1023"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Unit / Batch ID
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. BPL-CENTRAL-01"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Security PIN
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  maxLength={6}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md flex items-center justify-center space-x-2 text-sm"
            >
              <span>Access Digital Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Details Box */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <p className="font-semibold text-slate-700 mb-1">Demo Credentials:</p>
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg font-mono text-[11px] text-slate-600 border border-slate-200">
              <div>
                <span className="block text-[10px] text-slate-400 font-sans">Officer ID:</span>
                OFF-1023
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-sans">Unit:</span>
                BPL-CENTRAL-01
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-sans">PIN:</span>
                1234
              </div>
            </div>
          </div>
        </div>

        {/* Footer Security Notice */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Authorized Field Personnel Access Only • All digital actions are cryptographically logged.
        </p>
      </div>
    </div>
  );
}
