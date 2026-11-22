import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  History,
  Settings,
  ExternalLink,
  Search,
  Sparkles,
  Terminal
} from 'lucide-react';
import { Kbd } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDispatchSampleGoal?: (goal: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onDispatchSampleGoal
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'nav-workspace',
      title: 'Navigate to Workspace',
      category: 'Navigation',
      icon: <LayoutDashboard className="w-4 h-4 text-brand-400" />,
      run: () => {
        navigate('/');
        onClose();
      }
    },
    {
      id: 'nav-sessions',
      title: 'View Past Sessions & Audits',
      category: 'Navigation',
      icon: <History className="w-4 h-4 text-violet-400" />,
      run: () => {
        navigate('/sessions');
        onClose();
      }
    },
    {
      id: 'nav-settings',
      title: 'Open System Settings',
      category: 'Navigation',
      icon: <Settings className="w-4 h-4 text-slate-400" />,
      run: () => {
        navigate('/settings');
        onClose();
      }
    },
    {
      id: 'goal-hn',
      title: 'Sample Goal: Extract Top 3 AI Stories from HackerNews',
      category: 'Agent Action',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      run: () => {
        onDispatchSampleGoal?.('Navigate to HackerNews, find top 3 AI stories, extract titles and URLs');
        toast({
          title: 'Sample Goal Prepared',
          message: 'HackerNews extraction query loaded into the goal composer.',
          type: 'info'
        });
        navigate('/');
        onClose();
      }
    },
    {
      id: 'goal-github',
      title: 'Sample Goal: Summarize Trending TypeScript Repo on GitHub',
      category: 'Agent Action',
      icon: <Terminal className="w-4 h-4 text-blue-400" />,
      run: () => {
        onDispatchSampleGoal?.('Open GitHub trending repositories, summarize top TypeScript repo');
        toast({
          title: 'Sample Goal Prepared',
          message: 'GitHub trend research query loaded.',
          type: 'info'
        });
        navigate('/');
        onClose();
      }
    },
    {
      id: 'doc-api',
      title: 'Open FastAPI Interactive Docs',
      category: 'Documentation',
      icon: <ExternalLink className="w-4 h-4 text-emerald-400" />,
      run: () => {
        window.open('http://localhost:8000/docs', '_blank');
        onClose();
      }
    }
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-surface-100 border border-slate-700/80 rounded-xl shadow-modal overflow-hidden animate-scale-in z-10 flex flex-col">
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, goal, or page..."
            className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
          />
          <Kbd>ESC</Kbd>
        </div>

        {/* Action list */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching commands found for "{query}"
            </div>
          ) : (
            filtered.map((action) => (
              <button
                key={action.id}
                onClick={action.run}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs text-slate-300 hover:text-white hover:bg-surface-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-surface-200 border border-slate-700/60 flex items-center justify-center shrink-0">
                    {action.icon}
                  </div>
                  <div>
                    <div className="font-medium text-slate-200 group-hover:text-white">
                      {action.title}
                    </div>
                    <div className="text-[10px] text-slate-500">{action.category}</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  Jump ↵
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-surface-200/50 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-brand-400" />
            <span>NAVI Quick Navigator</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Use</span>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <span>to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
