import React from 'react';
import { Compass, Radio, ExternalLink } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { BackendStatusResponse } from '../../services/api';

interface HeaderProps {
  backendStatus: BackendStatusResponse | null;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ backendStatus, isLoading }) => {
  return (
    <header className="h-16 border-b border-surface-border bg-surface-100/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-accent p-0.5 flex items-center justify-center shadow-lg shadow-brand-600/20">
          <div className="w-full h-full bg-background rounded-[7px] flex items-center justify-center">
            <Compass className="w-5 h-5 text-brand-400 animate-spin-slow" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-white font-mono text-base">NAVI</span>
            <span className="text-xs bg-brand-500/10 text-brand-300 border border-brand-500/20 px-1.5 py-0.5 rounded font-mono">
              v0.1.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal">
            Neural Autonomous Web Intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-200 border border-slate-800 text-xs">
          <Radio className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Backend API:</span>
          {isLoading ? (
            <span className="text-slate-500 animate-pulse font-mono">Checking...</span>
          ) : backendStatus ? (
            <StatusBadge status="healthy" label={`${backendStatus.environment} (${backendStatus.uptime_seconds}s)`} />
          ) : (
            <StatusBadge status="offline" label="Unreachable" />
          )}
        </div>

        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded hover:bg-surface-50 transition"
        >
          <span>API Docs</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>
      </div>
    </header>
  );
};
