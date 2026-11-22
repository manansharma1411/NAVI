import React from 'react';
import { History } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const SessionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
          Past Sessions & Audits
        </h1>
        <p className="text-sm text-slate-400">
          Review historical execution traces, DOM snapshots, and action verification audits.
        </p>
      </div>

      <Card variant="elevated" className="py-16 text-center border-slate-800">
        <div className="w-12 h-12 rounded-xl bg-surface-200 border border-slate-700 mx-auto flex items-center justify-center text-slate-400 mb-4">
          <History className="w-6 h-6 text-brand-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-200 mb-1">
          No Past Sessions Recorded
        </h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">
          Once you trigger goals in the Workspace, complete execution histories with step-by-step screenshots will be archived here.
        </p>
      </Card>
    </div>
  );
};
