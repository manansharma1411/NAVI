import React from 'react';
import { Key, Shield, Globe } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { API_BASE_URL, isApiConfigured } from '../services/api';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
          System Configuration
        </h1>
        <p className="text-sm text-slate-400">
          Configure multi-modal model keys, extension bridge ports, and execution safety boundaries.
        </p>
      </div>

      <div className="space-y-4">
        {/* Active Backend Endpoint */}
        <Card variant="elevated" className="border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Globe className="w-4 h-4 text-brand-400" />
            <h2 className="text-sm font-semibold text-white">Active Backend Environment</h2>
          </div>
          <p className="text-xs text-slate-400">
            The target backend API URL utilized by this dashboard instance. Configured via <code className="font-mono text-brand-300">VITE_API_BASE_URL</code>.
          </p>
          <div className="text-xs">
            <label className="block text-slate-300 mb-1 font-mono">TARGET_API_ENDPOINT</label>
            <input
              type="text"
              value={isApiConfigured() ? API_BASE_URL : 'Unconfigured (Set VITE_API_BASE_URL in Vercel)'}
              disabled
              className="w-full bg-surface-200 border border-slate-700 rounded-lg p-2.5 text-slate-300 font-mono text-xs"
            />
          </div>
        </Card>

        {/* AI Model Keys */}
        <Card variant="elevated" className="border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Key className="w-4 h-4 text-brand-400" />
            <h2 className="text-sm font-semibold text-white">AI Model Provider Configuration</h2>
          </div>
          <p className="text-xs text-slate-400">
            Keys are stored securely in your deployment environment (Render Environment Variables) and processed exclusively on the backend. Never exposed to the browser.
          </p>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-mono">GEMINI_API_KEY</label>
              <input
                type="password"
                placeholder="Configured securely in backend environment"
                disabled
                className="w-full bg-surface-200 border border-slate-700 rounded-lg p-2.5 text-slate-400 font-mono text-xs"
              />
            </div>
          </div>
        </Card>

        {/* Safety Policies */}
        <Card variant="elevated" className="border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Safety & Human Confirmation Policy</h2>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <label className="flex items-center gap-2.5">
              <input type="checkbox" defaultChecked disabled className="rounded bg-surface-200 border-slate-700 text-brand-600" />
              <span>Require explicit confirmation before financial / checkout actions</span>
            </label>
            <label className="flex items-center gap-2.5">
              <input type="checkbox" defaultChecked disabled className="rounded bg-surface-200 border-slate-700 text-brand-600" />
              <span>Block navigation outside permitted domain scopes</span>
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
};
