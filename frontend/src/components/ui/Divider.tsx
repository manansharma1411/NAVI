import React, { ReactNode } from 'react';

export interface DividerProps {
  label?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  label,
  orientation = 'horizontal',
  className = ''
}) => {
  if (orientation === 'vertical') {
    return <div className={`w-[1px] bg-slate-800 self-stretch ${className}`} />;
  }

  if (label) {
    return (
      <div className={`relative flex items-center w-full my-3 ${className}`}>
        <div className="flex-grow border-t border-slate-800/80" />
        <span className="flex-shrink mx-3 text-[10px] font-mono uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <div className="flex-grow border-t border-slate-800/80" />
      </div>
    );
  }

  return <hr className={`border-t border-slate-800/80 my-3 w-full ${className}`} />;
};
