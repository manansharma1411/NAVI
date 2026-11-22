import React, { ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'An unexpected error occurred',
  message,
  details,
  onRetry,
  action,
  className = ''
}) => {
  return (
    <div
      className={`p-6 bg-red-500/5 border border-red-500/20 rounded-xl text-left max-w-lg mx-auto ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-red-200 tracking-tight">{title}</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{message}</p>

          {details && (
            <div className="mt-3 p-2.5 bg-black/40 border border-red-500/20 rounded font-mono text-[11px] text-red-300 overflow-x-auto">
              {details}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2.5">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Try Again
              </Button>
            )}
            {action}
          </div>
        </div>
      </div>
    </div>
  );
};
