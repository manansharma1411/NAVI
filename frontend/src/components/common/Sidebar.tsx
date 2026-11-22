import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings, ShieldCheck, Cpu } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const links = [
    { to: '/', label: 'Workspace', icon: LayoutDashboard },
    { to: '/sessions', label: 'Past Sessions', icon: History },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-surface-border bg-surface-200/50 flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2 font-mono">
            Navigation
          </div>
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-600/10 text-brand-300 border border-brand-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-surface-50'
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

        <div className="pt-4 border-t border-slate-800/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3 font-mono">
            Core Status
          </div>
          <div className="space-y-2 px-3 text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-slate-500" />
                Orchestrator
              </span>
              <span className="text-emerald-400 font-mono text-[11px]">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Safety Guard
              </span>
              <span className="text-emerald-400 font-mono text-[11px]">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-surface-100 border border-slate-800/80 rounded-lg text-xs">
        <p className="font-semibold text-white mb-1">Hackathon Target</p>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Autonomous web agent with Chromium extension CDP execution.
        </p>
      </div>
    </aside>
  );
};
