import React from 'react';
import { Shield, User, Building2, BadgeCheck, MapPin, KeyRound, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { officer, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-2xl shadow-lg border-2 border-white ring-4 ring-blue-50">
            <Shield className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active Field Duty</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{officer?.name || 'Officer Vikram Sharma'}</h1>
            <p className="text-sm font-medium text-slate-500">
              {officer?.role || 'Field Testing Officer'} • {officer?.department || 'Narcotics Control Bureau'}
            </p>
          </div>
        </div>

        {/* Credentials Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-sans uppercase text-[10px] font-bold block">Officer Identifier</span>
            <div className="font-mono font-bold text-slate-900 text-base flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>{officer?.officerId || 'OFF-1023'}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-sans uppercase text-[10px] font-bold block">Assigned Unit Code</span>
            <div className="font-mono font-bold text-slate-900 text-base flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>{officer?.unit || 'BPL-CENTRAL-01'}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-sans uppercase text-[10px] font-bold block">Jurisdiction Zone</span>
            <div className="font-semibold text-slate-800 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Bhopal Central Zone, Madhya Pradesh</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-sans uppercase text-[10px] font-bold block">Security Clearance</span>
            <div className="font-semibold text-slate-800 flex items-center space-x-2">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>Level 2 Presumptive Digital Verification</span>
            </div>
          </div>
        </div>

        {/* Prototype Account Management Notice */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
          <p className="font-semibold text-slate-800 mb-1">Prototype Account Notice:</p>
          <p>
            Real account creation and password management are disabled in prototype mode. Officer credentials are provisioned by the Central Supervisor Bureau.
          </p>
        </div>

        {/* Logout Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center space-x-2 text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-5 py-2.5 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Officer Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
