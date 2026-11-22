import React from 'react';

export interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'md',
  label,
  className = ''
}) => {
  const sizes = {
    sm: 'w-3.5 h-3.5 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-7 h-7 border-[2.5px]'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`rounded-full border-slate-700 border-t-brand-500 animate-spin shrink-0 ${sizes[size]}`}
      />
      {label && <span className="text-xs text-slate-400 font-medium">{label}</span>}
    </div>
  );
};
