import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    orange: 'bg-amber-50 text-amber-700 border-amber-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const iconBgMap = {
    blue: 'bg-blue-600 text-white',
    green: 'bg-emerald-600 text-white',
    red: 'bg-rose-600 text-white',
    orange: 'bg-amber-600 text-white',
    slate: 'bg-slate-700 text-white'
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-lg ${iconBgMap[color] || iconBgMap.blue} shadow-xs`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
