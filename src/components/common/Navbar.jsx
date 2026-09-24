import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Shield, PlusCircle, History, LayoutDashboard, UserCheck, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { officer, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'New Test', path: '/new-test/kit', icon: PlusCircle, isPrimary: true },
    { label: 'History', path: '/history', icon: History },
    { label: 'Admin', path: '/admin', icon: ShieldAlert },
    { label: 'Profile', path: '/profile', icon: UserCheck },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg tracking-tight text-white">DrugTest Secure</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold bg-blue-900/80 text-blue-200 px-1.5 py-0.5 rounded border border-blue-700/50">SIH Prototype</span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">Digital Presumptive Verification System</p>
              </div>
            </div>

            {/* Desktop Quick Nav Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path) || (item.path === '/new-test/kit' && location.pathname.startsWith('/new-test'));
                
                if (item.isPrimary) {
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition shadow-sm ml-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                      isActive 
                        ? 'bg-slate-800 text-white' 
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Officer Quick Info & Logout */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-200">{officer?.officerId || 'OFF-1023'}</div>
                <div className="text-[11px] text-slate-400">{officer?.unit || 'BPL-CENTRAL-01'}</div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Mobile-first requirement) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-300 border-t border-slate-800 z-40 px-2 py-1.5 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path) || (item.path === '/new-test/kit' && location.pathname.startsWith('/new-test'));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg text-[11px] font-medium transition ${
                isActive ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-md ${item.isPrimary ? 'bg-blue-600 text-white -mt-3 shadow-md border-2 border-slate-900' : ''}`}>
                <Icon className={`w-5 h-5 ${item.isPrimary ? 'text-white' : ''}`} />
              </div>
              <span className={item.isPrimary ? 'text-blue-400 font-bold mt-0.5' : 'mt-0.5'}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
