import React from 'react';
import { Terminal, Eye } from 'lucide-react';
import { Card } from '../ui/Card';

export const ActionStreamPreview: React.FC = () => {
  return (
    <Card variant="elevated" className="border-slate-800">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-semibold text-white">Live Telemetry & Action Stream</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-600" />
          <span className="text-xs text-slate-400 font-mono">Stream Standby</span>
        </div>
      </div>

      {/* Useful empty state */}
      <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-surface-200 border border-slate-700/60 flex items-center justify-center mb-4 text-slate-400 shadow-inner">
          <Eye className="w-6 h-6 text-brand-400/80" />
        </div>
        <h4 className="text-base font-semibold text-slate-200 mb-1">
          No Active Agent Session
        </h4>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          Submit a goal to trigger the Observe-Plan-Act execution loop. Real-time DOM element bounding boxes, CDP interaction logs, and multi-modal reasoning steps will stream here live.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-xl text-left">
          <div className="p-3 bg-surface-200/60 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
              <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[10px]">1</span>
              Observe
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Extension extracts clean accessibility tree and screenshot.
            </p>
          </div>
          <div className="p-3 bg-surface-200/60 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
              <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[10px]">2</span>
              Plan & Guard
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Backend LLM synthesizes vetted atomic browser actions.
            </p>
          </div>
          <div className="p-3 bg-surface-200/60 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
              <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[10px]">3</span>
              Actuate (CDP)
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Authentic clicks and keypresses executed via Chrome APIs.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
