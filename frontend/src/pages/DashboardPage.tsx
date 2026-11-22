import React from 'react';
import { AlertCircle } from 'lucide-react';
import { GoalInputCard } from '../components/dashboard/GoalInputCard';
import { ActionStreamPreview } from '../components/dashboard/ActionStreamPreview';
import { SystemMetrics } from '../components/dashboard/SystemMetrics';
import { BackendStatusResponse, API_BASE_URL, isApiConfigured } from '../services/api';

interface DashboardPageProps {
  backendStatus: BackendStatusResponse | null;
  connectionError: string | null;
  prefilledGoal?: string;
  onDispatchGoal?: (goal: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  backendStatus,
  connectionError,
  prefilledGoal,
  onDispatchGoal
}) => {
  return (
    <div className="space-y-5 max-w-5xl">
      {/* Page Title & Tagline */}
      <div className="flex items-start justify-between flex-wrap gap-2 pb-1 border-b border-slate-800/60">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Autonomous Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            You set the goal. NAVI plans, observes, and navigates the live web.
          </p>
        </div>
        <div className="text-[11px] font-mono text-slate-500 self-end">
          Execution Mode: <span className="text-emerald-400">CDP Native</span>
        </div>
      </div>

      {/* Connection Diagnostic Alert if connection failed */}
      {!backendStatus && connectionError && (
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1.5 animate-slide-down">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Backend Engine Offline or Starting Up</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {connectionError}
          </p>
          <div className="flex items-center gap-4 text-slate-400 pt-0.5 text-[10px]">
            <span>Target: <code className="text-amber-200 font-mono">{API_BASE_URL || '(empty)'}</code></span>
            {!isApiConfigured() && (
              <span className="text-amber-400 font-medium">
                Set <code className="font-mono bg-black/30 px-1 py-0.5 rounded">VITE_API_BASE_URL</code> in Vercel project settings.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Metrics Overview */}
      <SystemMetrics status={backendStatus} connectionError={connectionError} />

      {/* Goal Dispatcher */}
      <GoalInputCard
        isBackendConnected={!!backendStatus}
        prefilledGoal={prefilledGoal}
        onDispatchGoal={onDispatchGoal}
      />

      {/* Live Action Stream Preview */}
      <ActionStreamPreview />
    </div>
  );
};
