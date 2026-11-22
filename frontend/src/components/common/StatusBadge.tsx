import React from 'react';

interface StatusBadgeProps {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'idle' | 'executing' | 'offline';
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '' }) => {
  const configs = {
    healthy: {
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      dot: 'bg-emerald-400',
      text: label || 'Operational'
    },
    degraded: {
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      dot: 'bg-amber-400 animate-pulse',
      text: label || 'Degraded'
    },
    unhealthy: {
      color: 'bg-red-500/10 text-red-400 border-red-500/20',
      dot: 'bg-red-400',
      text: label || 'Down'
    },
    idle: {
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      dot: 'bg-blue-400',
      text: label || 'Idle'
    },
    executing: {
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      dot: 'bg-indigo-400 animate-ping',
      text: label || 'Navigating'
    },
    offline: {
      color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      dot: 'bg-slate-400',
      text: label || 'Offline'
    }
  };

  const current = configs[status] || configs.offline;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${current.color} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {current.text}
    </span>
  );
};
