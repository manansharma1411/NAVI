import React from 'react';
import { Server, Clock, Layers, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Tooltip } from '../ui/Tooltip';
import { StatusIndicator } from '../ui/StatusIndicator';
import { BackendStatusResponse, isApiConfigured } from '../../services/api';

interface SystemMetricsProps {
  status: BackendStatusResponse | null;
  connectionError?: string | null;
}

export const SystemMetrics: React.FC<SystemMetricsProps> = ({ status, connectionError }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Backend State */}
      <Tooltip content={status ? `Environment: ${status.environment}` : (connectionError || 'Backend not connected')}>
        <Card className="flex items-center gap-3 p-3.5 bg-surface-100/60 border-slate-800/80 hover:border-slate-700/80 transition cursor-default">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
            <Server className="w-4 h-4 text-brand-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Backend Engine
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <StatusIndicator
                status={status ? 'online' : (!isApiConfigured() ? 'standby' : 'offline')}
                size="sm"
                pulse={!!status}
              />
              <span className="text-xs font-semibold text-white capitalize truncate">
                {status ? status.status : (!isApiConfigured() ? 'Unconfigured' : 'Offline')}
              </span>
            </div>
          </div>
        </Card>
      </Tooltip>

      {/* Uptime */}
      <Tooltip content="Seconds elapsed since backend instance startup">
        <Card className="flex items-center gap-3 p-3.5 bg-surface-100/60 border-slate-800/80 hover:border-slate-700/80 transition cursor-default">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Service Uptime
            </div>
            <div className="text-xs font-semibold text-white font-mono mt-0.5">
              {status ? `${Math.round(status.uptime_seconds)}s` : '0s'}
            </div>
          </div>
        </Card>
      </Tooltip>

      {/* Active Sessions */}
      <Tooltip content="Active concurrent autonomous browser sessions">
        <Card className="flex items-center gap-3 p-3.5 bg-surface-100/60 border-slate-800/80 hover:border-slate-700/80 transition cursor-default">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-violet-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Active Sessions
            </div>
            <div className="text-xs font-semibold text-white font-mono mt-0.5">
              {status ? status.active_sessions : 0} <span className="text-[10px] text-slate-500 font-sans">running</span>
            </div>
          </div>
        </Card>
      </Tooltip>

      {/* Safety Boundary */}
      <Tooltip content="Deterministic action guardrails prohibiting destructive checkout/auth actions">
        <Card className="flex items-center gap-3 p-3.5 bg-surface-100/60 border-slate-800/80 hover:border-slate-700/80 transition cursor-default">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Safety Guard
            </div>
            <div className="text-xs font-semibold text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Enforced</span>
            </div>
          </div>
        </Card>
      </Tooltip>
    </div>
  );
};
