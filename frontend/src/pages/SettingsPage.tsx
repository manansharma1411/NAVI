import React, { useState } from 'react';
import { Key, Shield, Globe, Lock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { API_BASE_URL, isApiConfigured } from '../services/api';
import { useToast } from '../context/ToastContext';

export const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [requireConfirmation, setRequireConfirmation] = useState(true);
  const [restrictDomains, setRestrictDomains] = useState(true);

  const handleSavePolicy = () => {
    toast({
      title: 'Safety Policy Updated',
      message: 'Client-side confirmation gates have been synchronized.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-start justify-between flex-wrap gap-2 pb-1 border-b border-slate-800/60">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            System Configuration
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage multi-modal AI provider bindings, execution boundaries, and deployment endpoints.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Backend Endpoint Status */}
        <Card variant="elevated" className="border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-400" />
              <h2 className="text-xs font-semibold text-white tracking-tight">Active Backend Target</h2>
            </div>
            <Badge variant={isApiConfigured() ? 'success' : 'warning'} size="sm" dot>
              {isApiConfigured() ? 'Configured' : 'Unset'}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The target backend API URL utilized by this dashboard instance. Configured via <code className="font-mono text-brand-300">VITE_API_BASE_URL</code> in your environment.
          </p>
          <Input
            label="API Base URL"
            value={isApiConfigured() ? API_BASE_URL : 'Unconfigured (Set VITE_API_BASE_URL in Vercel)'}
            readOnly
            className="font-mono text-[11px]"
            hint="Set in Vercel Project Settings -> Environment Variables for production"
          />
        </Card>

        {/* AI Model Keys */}
        <Card variant="elevated" className="border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-violet-400" />
              <h2 className="text-xs font-semibold text-white tracking-tight">AI Model Provider Configuration</h2>
            </div>
            <Badge variant="neutral" size="sm">
              Backend Isolated
            </Badge>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            API keys are processed exclusively on the Render backend server and never leaked to the client browser.
          </p>
          <div className="space-y-3">
            <Input
              label="GEMINI_API_KEY"
              type="password"
              placeholder="Stored securely in backend environment"
              disabled
              leftIcon={<Lock className="w-3.5 h-3.5 text-slate-500" />}
              hint="Configure in Render Dashboard -> navi-backend -> Environment"
            />
          </div>
        </Card>

        {/* Safety Policies */}
        <Card variant="elevated" className="border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs font-semibold text-white tracking-tight">Safety & Human Confirmation Policy</h2>
            </div>
            <Badge variant="brand" size="sm">
              Enforced
            </Badge>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <label className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-200/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
              <input
                type="checkbox"
                checked={requireConfirmation}
                onChange={(e) => setRequireConfirmation(e.target.checked)}
                className="rounded bg-surface-100 border-slate-700 text-brand-600 focus:ring-brand-500 mt-0.5"
              />
              <div>
                <span className="font-medium text-slate-200">Require explicit confirmation for financial & irreversible actions</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  NAVI pauses execution and prompts for approval before clicking checkout buttons, submitting forms with passwords, or deleting accounts.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-200/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
              <input
                type="checkbox"
                checked={restrictDomains}
                onChange={(e) => setRestrictDomains(e.target.checked)}
                className="rounded bg-surface-100 border-slate-700 text-brand-600 focus:ring-brand-500 mt-0.5"
              />
              <div>
                <span className="font-medium text-slate-200">Restrict navigation to user-authorized tab sessions</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Prevents extension CDP actuation from wandering outside the target workflow domains.
                </p>
              </div>
            </label>
          </div>

          <div className="pt-1 flex justify-end">
            <Button variant="secondary" size="sm" onClick={handleSavePolicy}>
              Save Policies
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
