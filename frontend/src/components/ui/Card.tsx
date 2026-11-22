import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-surface border border-slate-800 shadow-subtle-border',
    elevated: 'bg-surface-100 border border-slate-700/60 shadow-elevated',
    interactive:
      'bg-surface hover:bg-surface-50 border border-slate-800 hover:border-slate-700 transition-all duration-150 cursor-pointer shadow-subtle-border active:scale-[0.99]'
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-5',
    lg: 'p-6'
  };

  return (
    <div
      className={`rounded-xl ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
