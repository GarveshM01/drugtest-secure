import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, History, ShieldAlert, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { officer } = useAuth();

  const links = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Start New Test', path: '/new-test/kit', icon: PlusCircle },
    { label: 'Test History', path: '/history', icon: History },
    { label: 'Admin / Supervisor', path: '/admin', icon: ShieldAlert },
    { label: 'Officer Profile', path: '/profile', icon: UserCheck },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-slate-900 border-r border-slate-800 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex-col justify-between">
      <div className="space-y-6">
        {/* Officer Card */}
        <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">{officer?.name || 'Officer Sharma'}</div>
              <div className="text-[11px] text-slate-400 font-mono">ID: {officer?.officerId || 'OFF-1023'}</div>
            </div>
          </div>
          <div className="mt-3 text-[11px] bg-slate-900/80 px-2.5 py-1 rounded text-slate-300 flex justify-between border border-slate-800">
            <span>Unit:</span>
            <span className="font-medium text-blue-400">{officer?.unit || 'BPL-CENTRAL-01'}</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Main Navigation
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
        <div>DrugTest Secure v1.0.0</div>
        <div className="text-slate-400 mt-0.5">SIH 2026 Prototype</div>
      </div>
    </aside>
  );
}
