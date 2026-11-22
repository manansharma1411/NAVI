import React from 'react';
import { AlertCircle } from 'lucide-react';
import { GoalInputCard } from '../components/dashboard/GoalInputCard';
import { ActionStreamPreview } from '../components/dashboard/ActionStreamPreview';
import { SystemMetrics } from '../components/dashboard/SystemMetrics';
import { BackendStatusResponse, API_BASE_URL, isApiConfigured } from '../services/api';

interface DashboardPageProps {
  backendStatus: BackendStatusResponse | null;
  connectionError: string | null;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ backendStatus, connectionError }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
          Agent Workspace
        </h1>
        <p className="text-sm text-slate-400">
          Set your objective and supervise real-time browser actions with safety guardrails.
        </p>
      </div>

      {/* Production Connection Diagnostic Alert if connection failed */}
      {!backendStatus && connectionError && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Backend Connection Alert</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {connectionError}
          </p>
          <div className="flex items-center gap-4 text-slate-400 pt-1 text-[11px]">
            <span>Current target: <code className="text-amber-200 font-mono">{API_BASE_URL || '(empty)'}</code></span>
            {!isApiConfigured() && (
              <span className="text-amber-400 font-medium">
                To fix: Add <code className="font-mono bg-black/30 px-1 py-0.5 rounded">VITE_API_BASE_URL</code> in Vercel project settings.
              </span>
            )}
          </div>
        </div>
      )}

      <SystemMetrics status={backendStatus} connectionError={connectionError} />

      <GoalInputCard isBackendConnected={!!backendStatus} />

      <ActionStreamPreview />
    </div>
  );
};
