import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  charCount?: number;
  maxChars?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, charCount, maxChars, className = '', id, rows = 3, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={inputId} className="block text-xs font-medium text-slate-300">
              {label}
            </label>
          )}
          {maxChars && (
            <span className="text-[10px] font-mono text-slate-500">
              {charCount ?? 0}/{maxChars}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`w-full bg-surface-200 border rounded-lg text-xs text-slate-100 placeholder:text-slate-500 transition-colors duration-150 focus:outline-none focus:ring-1 focus:border-brand-500 focus:ring-brand-500 shadow-subtle-border resize-none p-3 ${
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
              : 'border-slate-700/80 hover:border-slate-600'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-red-400 leading-none">{error}</p>
        ) : hint ? (
          <p className="text-[11px] text-slate-500 leading-none">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
