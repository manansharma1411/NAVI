import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-subtle-border';

    const variants = {
      primary:
        'bg-brand-600 hover:bg-brand-500 text-white shadow-glow-brand focus:ring-brand-500/50 border border-brand-400/20',
      secondary:
        'bg-surface-100 hover:bg-surface-50 text-slate-200 border border-slate-700/60 focus:ring-slate-500/40',
      outline:
        'bg-transparent hover:bg-surface-100 text-slate-300 border border-slate-700/80 focus:ring-slate-500/40',
      ghost:
        'bg-transparent hover:bg-surface-100 text-slate-400 hover:text-slate-100 border-transparent shadow-none focus:ring-slate-500/30',
      danger:
        'bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 focus:ring-red-500/40'
    };

    const sizes = {
      sm: 'text-xs px-2.5 py-1.5 gap-1.5 min-h-[30px]',
      md: 'text-xs px-3.5 py-2 gap-2 min-h-[36px]',
      lg: 'text-sm px-4.5 py-2.5 gap-2.5 min-h-[42px]'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
