import React, { useState } from 'react';
import { Play, Sparkles, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface GoalInputCardProps {
  onDispatchGoal?: (goal: string) => void;
  isBackendConnected: boolean;
}

export const GoalInputCard: React.FC<GoalInputCardProps> = ({ isBackendConnected }) => {
  const [goal, setGoal] = useState('');

  const sampleGoals = [
    'Navigate to HackerNews, find top 3 AI stories, extract titles and URLs',
    'Open GitHub trending repositories, summarize top TypeScript repo',
    'Search flights from SFO to JFK on Google Flights for next Friday'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    alert(`Goal received: "${goal}". Action dispatch will connect to Backend Agent in Phase 4.`);
  };

  return (
    <Card variant="elevated" className="border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          <h2 className="text-base font-semibold text-white">Universal Goal Dispatcher</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Execution Policy: <strong className="text-slate-200">Strict Safety</strong></span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Describe the multi-step web task you want NAVI to execute..."
            rows={3}
            className="w-full bg-surface-200 border border-slate-700/80 rounded-lg p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition resize-none font-sans"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">Quick suggestions:</span>
            {sampleGoals.slice(0, 1).map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGoal(s)}
                className="text-left text-brand-300 hover:text-brand-200 truncate max-w-xs underline decoration-brand-500/40"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {!isBackendConnected && (
              <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Backend offline</span>
              </div>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={!goal.trim()}
              className="px-5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Initiate Goal</span>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
