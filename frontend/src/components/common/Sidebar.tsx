import React from 'react';
import { LayoutDashboard, History, Settings, ShieldCheck, Cpu, Command } from 'lucide-react';
import { NavigationItem } from '../ui/NavigationItem';
import { Divider } from '../ui/Divider';
import { Badge } from '../ui/Badge';

interface SidebarProps {
  onOpenCommandPalette?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenCommandPalette }) => {
  return (
    <aside className="w-56 border-r border-surface-border bg-surface-200/40 flex flex-col justify-between p-3 min-h-[calc(100vh-3.5rem)] select-none">
      <div className="space-y-4">
        {/* Navigation Section */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-1.5 font-semibold">
            Platform
          </div>
          <nav className="space-y-0.5">
            <NavigationItem
              to="/"
              label="Workspace"
              icon={<LayoutDashboard className="w-4 h-4 text-brand-400" />}
              shortcut="1"
            />
            <NavigationItem
              to="/sessions"
              label="Audit Traces"
              icon={<History className="w-4 h-4 text-violet-400" />}
              shortcut="2"
            />
            <NavigationItem
              to="/settings"
              label="Configuration"
              icon={<Settings className="w-4 h-4 text-slate-400" />}
              shortcut="3"
            />
          </nav>
        </div>

        <Divider />

        {/* Core Subsystem Readiness */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-2 font-semibold">
            Agent Subsystems
          </div>
          <div className="space-y-1.5 px-3 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-slate-500" />
                Orchestrator
              </span>
              <Badge variant="success" size="sm" dot>
                Ready
              </Badge>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Safety Boundary
              </span>
              <Badge variant="brand" size="sm">
                Enforced
              </Badge>
            </div>
          </div>
        </div>

        {/* Command palette shortcut pill */}
        {onOpenCommandPalette && (
          <div className="px-1 pt-1">
            <button
              onClick={onOpenCommandPalette}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-surface-100 hover:bg-surface-50 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition-colors shadow-subtle-border group"
            >
              <div className="flex items-center gap-2">
                <Command className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-[11px] font-medium">Quick Actions</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-surface-200 px-1 py-0.5 rounded border border-slate-700/60">
                ⌘K
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Footer card */}
      <div className="p-3 bg-surface-100/60 border border-slate-800 rounded-lg text-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-200 text-[11px]">NAVI Runtime</span>
          <span className="text-[10px] font-mono text-emerald-400">v0.1.0</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-snug">
          Chromium DevTools Protocol & Fast Multi-modal Planning.
        </p>
      </div>
    </aside>
  );
};
