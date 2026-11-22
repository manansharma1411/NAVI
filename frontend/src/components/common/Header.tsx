import React from 'react';
import { Compass, Radio, ExternalLink, Search } from 'lucide-react';
import { StatusIndicator } from '../ui/StatusIndicator';
import { Badge, Kbd } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';
import { BackendStatusResponse, API_BASE_URL, isApiConfigured } from '../../services/api';

interface HeaderProps {
  backendStatus: BackendStatusResponse | null;
  isLoading: boolean;
  connectionError: string | null;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  backendStatus,
  isLoading,
  connectionError,
  onOpenCommandPalette
}) => {
  const docsUrl = isApiConfigured()
    ? `${API_BASE_URL}/docs`
    : 'https://github.com/manansharma1411/NAVI#developer-quickstart';

  const getStatusNode = () => {
    if (isLoading && !backendStatus) {
      return (
        <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-ping" />
          Connecting...
        </span>
      );
    }
    if (backendStatus) {
      return (
        <Tooltip content={`Connected to ${API_BASE_URL || 'Localhost'}`}>
          <div className="flex items-center gap-2">
            <StatusIndicator status="online" size="sm" pulse />
            <span className="text-[11px] font-mono text-emerald-400">
              {backendStatus.environment} ({Math.round(backendStatus.uptime_seconds)}s)
            </span>
          </div>
        </Tooltip>
      );
    }
    if (!isApiConfigured()) {
      return (
        <Tooltip content="Set VITE_API_BASE_URL in your Vercel project settings">
          <div className="flex items-center gap-2">
            <StatusIndicator status="standby" size="sm" pulse={false} />
            <span className="text-[11px] font-mono text-amber-400">URL Unset</span>
          </div>
        </Tooltip>
      );
    }
    return (
      <Tooltip content={connectionError || 'Backend unreachable'}>
        <div className="flex items-center gap-2">
          <StatusIndicator status="offline" size="sm" pulse={false} />
          <span className="text-[11px] font-mono text-slate-400">Offline</span>
        </div>
      </Tooltip>
    );
  };

  return (
    <header className="h-14 border-b border-surface-border bg-surface-200/70 backdrop-blur-md px-5 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-accent p-0.5 flex items-center justify-center shadow-glow-brand">
          <div className="w-full h-full bg-background rounded-[6px] flex items-center justify-center">
            <Compass className="w-4 h-4 text-brand-400" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-tight text-white font-mono text-sm">NAVI</span>
          <Badge variant="brand" size="sm">
            v0.1.0
          </Badge>
          <span className="hidden md:inline text-[11px] text-slate-500 font-normal">
            Neural Autonomous Web Intelligence
          </span>
        </div>
      </div>

      {/* Center Search / Command Trigger */}
      <div className="flex-1 max-w-xs mx-4 hidden sm:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 border border-slate-700/60 text-slate-400 hover:text-slate-200 text-xs transition-colors shadow-subtle-border group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
            <span>Search or command...</span>
          </div>
          <div className="flex items-center gap-1">
            <Kbd>⌘K</Kbd>
          </div>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Backend Status indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-100 border border-slate-800 text-xs">
          <Radio className="w-3.5 h-3.5 text-slate-500" />
          {getStatusNode()}
        </div>

        {/* API Docs Link */}
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded hover:bg-surface-50 transition"
          title="Open interactive API documentation"
        >
          <span>API</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>
      </div>
    </header>
  );
};
