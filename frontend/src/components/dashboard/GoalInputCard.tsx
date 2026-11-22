import React, { useState, useEffect } from 'react';
import { Play, Sparkles, SlidersHorizontal, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Kbd } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';
import { useToast } from '../../context/ToastContext';

interface GoalInputCardProps {
  onDispatchGoal?: (goal: string) => void;
  isBackendConnected: boolean;
  prefilledGoal?: string;
}

export const GoalInputCard: React.FC<GoalInputCardProps> = ({
  onDispatchGoal,
  isBackendConnected,
  prefilledGoal
}) => {
  const [goal, setGoal] = useState('');
  const [policy, setPolicy] = useState<'strict' | 'autonomous' | 'guided'>('strict');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (prefilledGoal) {
      setGoal(prefilledGoal);
    }
  }, [prefilledGoal]);

  const sampleGoals = [
    {
      label: 'HackerNews Top Stories',
      query: 'Navigate to news.ycombinator.com, locate top 3 AI discussions, extract titles & URLs.'
    },
    {
      label: 'GitHub Trending Repo',
      query: 'Open github.com/trending, summarize the primary TypeScript project and license.'
    },
    {
      label: 'Flight Search Prototype',
      query: 'Search non-stop flights from SFO to JFK on Google Flights for next Friday.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onDispatchGoal?.(goal);
      toast({
        title: 'Goal Dispatched to Orchestrator',
        message: `Plan synthesis initiated under ${policy.toUpperCase()} policy mode.`,
        type: 'success'
      });
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Card variant="elevated" className="border-slate-800 space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          </div>
          <h2 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">
            Autonomous Goal Composer
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-200 border border-slate-700/60 text-[11px] text-slate-300 hover:text-white transition"
              >
                <SlidersHorizontal className="w-3 h-3 text-slate-400" />
                <span>Policy: <strong className="capitalize text-brand-300">{policy}</strong></span>
              </button>
            }
            items={[
              {
                id: 'pol-strict',
                label: 'Strict Safety (Require confirmation on forms)',
                onClick: () => setPolicy('strict')
              },
              {
                id: 'pol-guided',
                label: 'Guided Oversight (Pause after key checkpoints)',
                onClick: () => setPolicy('guided')
              },
              {
                id: 'pol-auto',
                label: 'Autonomous Run (Execute verified read plans)',
                onClick: () => setPolicy('autonomous')
              }
            ]}
          />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Instruct NAVI with a natural language web objective (e.g., 'Go to Wikipedia, search for Quantum Computing, extract the introductory paragraph')..."
            rows={3}
            className="w-full bg-surface-200 border border-slate-700/80 rounded-lg p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition resize-none font-sans leading-relaxed"
          />
          <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5 text-[10px] text-slate-500 select-none">
            <Kbd>⌘</Kbd>
            <Kbd>Enter</Kbd>
            <span>to launch</span>
          </div>
        </div>

        {/* Action bar and prompt suggestions */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-500">Quick queries:</span>
            {sampleGoals.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGoal(sample.query)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-50 hover:bg-surface-100 text-slate-300 hover:text-white text-[10px] border border-slate-700/60 transition group"
              >
                <span>{sample.label}</span>
                <ArrowUpRight className="w-2.5 h-2.5 text-slate-500 group-hover:text-brand-300" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!isBackendConnected && (
              <div className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <ShieldAlert className="w-3 h-3" />
                <span>Backend offline</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              disabled={!goal.trim()}
              leftIcon={<Play className="w-3 h-3 fill-current" />}
            >
              Initiate Goal
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
