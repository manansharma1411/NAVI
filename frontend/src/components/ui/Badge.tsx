import React, { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const variants = {
    neutral: 'bg-surface-50 text-slate-300 border-slate-700/60',
    brand: 'bg-brand-500/10 text-brand-300 border-brand-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    outline: 'bg-transparent text-slate-400 border-slate-700'
  };

  const dotColors = {
    neutral: 'bg-slate-400',
    brand: 'bg-brand-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    error: 'bg-red-400',
    outline: 'bg-slate-500'
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1 font-mono',
    md: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium'
  };

  return (
    <span
      className={`inline-flex items-center rounded border tracking-tight ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

export const Kbd: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <kbd
      className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-surface-200 border border-slate-700/80 rounded shadow-sm ${className}`}
    >
      {children}
    </kbd>
  );
};
