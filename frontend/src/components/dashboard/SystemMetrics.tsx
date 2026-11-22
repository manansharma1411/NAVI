import React from 'react';
import { Activity, Server, Clock, Layers } from 'lucide-react';
import { Card } from '../ui/Card';
import { BackendStatusResponse, isApiConfigured } from '../../services/api';

interface SystemMetricsProps {
  status: BackendStatusResponse | null;
  connectionError?: string | null;
}

export const SystemMetrics: React.FC<SystemMetricsProps> = ({ status, connectionError }) => {
  const getBackendStateLabel = () => {
    if (status) return status.status;
    if (!isApiConfigured()) return 'Unconfigured';
    if (connectionError) return 'Offline';
    return 'Connecting...';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="flex items-center gap-3.5 bg-surface-100/80 border-slate-800">
        <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
          <Server className="w-5 h-5 text-brand-400" />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">
            Backend State
          </div>
          <div className="text-sm font-semibold text-white capitalize">
            {getBackendStateLabel()}
          </div>
        </div>
      </Card>

      <Card className="flex items-center gap-3.5 bg-surface-100/80 border-slate-800">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Clock className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">
            Uptime
          </div>
          <div className="text-sm font-semibold text-white font-mono">
            {status ? `${status.uptime_seconds}s` : '0s'}
          </div>
        </div>
      </Card>

      <Card className="flex items-center gap-3.5 bg-surface-100/80 border-slate-800">
        <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <Layers className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">
            Active Sessions
          </div>
          <div className="text-sm font-semibold text-white font-mono">
            {status ? status.active_sessions : 0}
          </div>
        </div>
      </Card>

      <Card className="flex items-center gap-3.5 bg-surface-100/80 border-slate-800">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">
            Bridge Status
          </div>
          <div className="text-sm font-semibold text-white">
            {status?.components.bridge ? 'Ready (WS)' : 'Standby'}
          </div>
        </div>
      </Card>
    </div>
  );
};
