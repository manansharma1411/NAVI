import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-surface border border-surface-border',
    elevated: 'bg-surface-100 border border-slate-800 shadow-xl shadow-black/40',
    glass: 'bg-surface/80 backdrop-blur-md border border-slate-800/80'
  };

  return (
    <div
      className={`rounded-xl p-5 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
