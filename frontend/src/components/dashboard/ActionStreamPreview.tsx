import React, { useState } from 'react';
import { Terminal, Eye, Code2, Play } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { StatusIndicator } from '../ui/StatusIndicator';
import { EmptyState } from '../ui/EmptyState';

export const ActionStreamPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stream' | 'dom' | 'perception'>('stream');
  const [showSampleStream, setShowSampleStream] = useState(false);

  const sampleSteps = [
    {
      step: 1,
      type: 'observe',
      label: 'Tab Observation Captured',
      desc: 'Extracted semantic DOM tree (14 interactable nodes) & viewport frame from news.ycombinator.com.',
      duration: '42ms',
      badge: 'OBSERVE',
      badgeVariant: 'neutral' as const
    },
    {
      step: 2,
      type: 'plan',
      label: 'Reasoning & Plan Synthesis',
      desc: 'Identified top story link elements: a#story-1, a#story-2, a#story-3. Synthesized ClickAction.',
      duration: '180ms',
      badge: 'PLAN',
      badgeVariant: 'brand' as const
    },
    {
      step: 3,
      type: 'execute',
      label: 'CDP Action Execution',
      desc: 'chrome.debugger dispatched trusted click event at coordinates { x: 342, y: 198 }.',
      duration: '65ms',
      badge: 'ACTUATE',
      badgeVariant: 'success' as const
    }
  ];

  return (
    <Card variant="elevated" className="border-slate-800 space-y-4">
      {/* Tab bar header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-surface-200 border border-slate-700/60 text-xs">
          <button
            onClick={() => setActiveTab('stream')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition ${
              activeTab === 'stream'
                ? 'bg-surface-50 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-brand-400" />
            <span>Action Stream</span>
          </button>
          <button
            onClick={() => setActiveTab('dom')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition ${
              activeTab === 'dom'
                ? 'bg-surface-50 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Semantic DOM Tree</span>
          </button>
          <button
            onClick={() => setActiveTab('perception')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition ${
              activeTab === 'perception'
                ? 'bg-surface-50 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-violet-400" />
            <span>Visual Perception</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSampleStream(!showSampleStream)}
            className="text-[11px] text-brand-300 hover:text-brand-200 transition underline underline-offset-4 decoration-brand-500/40"
          >
            {showSampleStream ? 'Reset to Standby' : 'Simulate Telemetry Stream'}
          </button>
          <StatusIndicator status={showSampleStream ? 'busy' : 'standby'} size="sm" pulse />
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'stream' && (
        <div>
          {showSampleStream ? (
            <div className="space-y-2.5 animate-fade-in">
              {sampleSteps.map((s) => (
                <div
                  key={s.step}
                  className="p-3 bg-surface-200/70 border border-slate-800 rounded-lg flex items-start justify-between gap-3 text-xs group hover:border-slate-700 transition"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-surface-100 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-slate-400 shrink-0 mt-0.5">
                      {s.step}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white tracking-tight">{s.label}</span>
                        <Badge variant={s.badgeVariant} size="sm">
                          {s.badge}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed font-mono">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 mt-0.5">
                    {s.duration}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Eye className="w-5 h-5 text-brand-400" />}
              title="No Active Agent Workflow"
              description="Dispatch a goal using the composer above or use ⌘K to simulate a sample task. Real-time DOM element bounding boxes and CDP interactions will stream here live."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSampleStream(true)}
                  leftIcon={<Play className="w-3 h-3 text-brand-400" />}
                >
                  Preview Telemetry Flow
                </Button>
              }
            />
          )}
        </div>
      )}

      {activeTab === 'dom' && (
        <div className="p-3 bg-surface-200/80 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto space-y-1 animate-fade-in">
          <div className="text-slate-500 pb-1">// Cleaned Semantic Accessibility Tree Snapshot</div>
          <div className="text-brand-300">{'<div role="main" aria-label="Stories">'}</div>
          <div className="pl-4 text-emerald-400">
            {'<a id="e-1" href="item?id=1" role="link">'}
            <span className="text-slate-300"> "AI Agents in Production 2026" </span>
            <span className="text-slate-500">[bounds: {`{x: 24, y: 140, w: 420, h: 22}`}]</span>
            {'</a>'}
          </div>
          <div className="pl-4 text-emerald-400">
            {'<a id="e-2" href="item?id=2" role="link">'}
            <span className="text-slate-300"> "FastAPI 0.115 Async Best Practices" </span>
            <span className="text-slate-500">[bounds: {`{x: 24, y: 172, w: 380, h: 22}`}]</span>
            {'</a>'}
          </div>
          <div className="text-brand-300">{'</div>'}</div>
        </div>
      )}

      {activeTab === 'perception' && (
        <div className="py-8 px-4 text-center bg-surface-200/50 rounded-lg border border-slate-800 space-y-2 animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 mx-auto flex items-center justify-center text-violet-400">
            <Eye className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-slate-200">Viewport Frame Synchronizer</div>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
            High-resolution screenshots captured by the Chrome Extension are paired with bounding box coordinates for multi-modal model spatial reasoning.
          </p>
        </div>
      )}
    </Card>
  );
};
