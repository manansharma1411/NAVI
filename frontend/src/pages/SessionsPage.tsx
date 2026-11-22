import React from 'react';
import { History, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Link } from 'react-router-dom';

export const SessionsPage: React.FC = () => {
  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-start justify-between flex-wrap gap-2 pb-1 border-b border-slate-800/60">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Audit Traces & Historical Runs
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step DOM observation logs, visual bounding box overlays, and CDP execution metrics.
          </p>
        </div>
      </div>

      <Card variant="elevated" className="border-slate-800">
        <EmptyState
          icon={<History className="w-5 h-5 text-brand-400" />}
          title="No Execution Traces Recorded"
          description="Whenever NAVI navigates the web on your behalf, complete step-by-step execution chains with DOM element snapshots and latency benchmarks will be archived here."
          action={
            <Link to="/">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Go to Workspace
              </Button>
            </Link>
          }
        />
      </Card>
    </div>
  );
};
