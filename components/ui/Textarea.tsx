'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      leftIcon,
      className,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-semibold uppercase tracking-wider text-slate-700 select-none flex items-center gap-1.5"
          >
            {leftIcon && <span className="text-slate-400 inline-flex">{leftIcon}</span>}
            <span>{label}</span>
          </label>
        )}
        <div className="relative flex">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            disabled={disabled}
            className={cn(
              'w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 p-4 shadow-soft-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed resize-y',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20 text-red-900',
              success && 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/20',
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-3 text-red-500 pointer-events-none">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
          {success && !error && (
            <div className="absolute right-3 top-3 text-emerald-500 pointer-events-none">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs font-medium text-red-600 animate-fadeIn">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
