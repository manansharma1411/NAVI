import React, { ReactNode } from 'react';

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = ''
}) => {
  return (
    <div
      className={`py-12 px-6 flex flex-col items-center justify-center text-center max-w-md mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-surface-50 border border-slate-700/60 flex items-center justify-center mb-3 text-slate-400 shadow-subtle-border">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-200 mb-1 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed mb-5 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
