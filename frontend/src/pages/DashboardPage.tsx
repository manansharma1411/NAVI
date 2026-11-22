import React from 'react';
import { GoalInputCard } from '../components/dashboard/GoalInputCard';
import { ActionStreamPreview } from '../components/dashboard/ActionStreamPreview';
import { SystemMetrics } from '../components/dashboard/SystemMetrics';
import { BackendStatusResponse } from '../services/api';

interface DashboardPageProps {
  backendStatus: BackendStatusResponse | null;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ backendStatus }) => {
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

      <SystemMetrics status={backendStatus} />

      <GoalInputCard isBackendConnected={!!backendStatus} />

      <ActionStreamPreview />
    </div>
  );
};
