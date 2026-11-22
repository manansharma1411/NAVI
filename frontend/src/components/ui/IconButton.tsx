import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      variant = 'ghost',
      size = 'md',
      label,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center rounded-lg transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed active:scale-95';

    const variants = {
      primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-glow-brand border border-brand-400/20',
      secondary: 'bg-surface-100 hover:bg-surface-50 text-slate-300 border border-slate-700/60',
      outline: 'bg-transparent hover:bg-surface-100 text-slate-300 border border-slate-700/70',
      ghost: 'bg-transparent hover:bg-surface-100 text-slate-400 hover:text-slate-200 border-transparent',
      danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
    };

    const sizes = {
      sm: 'w-7 h-7 text-xs',
      md: 'w-8 h-8 text-sm',
      lg: 'w-10 h-10 text-base',
    };

    return (
      <button
        ref={ref}
        aria-label={label}
        title={label}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
