import React from 'react';

export interface StatusIndicatorProps {
  status: 'online' | 'busy' | 'standby' | 'error' | 'offline';
  pulse?: boolean;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  pulse = true,
  label,
  size = 'md',
  className = ''
}) => {
  const configs = {
    online: {
      dot: 'bg-emerald-400',
      ping: 'bg-emerald-400',
      text: 'text-emerald-400',
      defaultLabel: 'Operational'
    },
    busy: {
      dot: 'bg-indigo-400',
      ping: 'bg-indigo-400',
      text: 'text-indigo-400',
      defaultLabel: 'Executing'
    },
    standby: {
      dot: 'bg-amber-400',
      ping: 'bg-amber-400',
      text: 'text-amber-400',
      defaultLabel: 'Standby'
    },
    error: {
      dot: 'bg-red-400',
      ping: 'bg-red-400',
      text: 'text-red-400',
      defaultLabel: 'Error'
    },
    offline: {
      dot: 'bg-slate-500',
      ping: 'bg-slate-500',
      text: 'text-slate-400',
      defaultLabel: 'Offline'
    }
  };

  const current = configs[status] || configs.offline;
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <span className="relative flex items-center justify-center">
        {pulse && status !== 'offline' && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${current.ping}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${dotSize} ${current.dot}`} />
      </span>
      {label !== undefined ? (
        <span className={`text-xs font-medium ${current.text}`}>{label}</span>
      ) : null}
    </div>
  );
};
