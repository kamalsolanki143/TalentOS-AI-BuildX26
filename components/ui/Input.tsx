'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-slate-700 select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 px-4 py-2.5 shadow-soft-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              (rightIcon || error || success) && 'pr-10',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20 text-red-900',
              success && 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/20',
              className
            )}
            {...props}
          />
          {error ? (
            <div className="absolute right-3 text-red-500 pointer-events-none flex items-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          ) : success ? (
            <div className="absolute right-3 text-emerald-500 pointer-events-none flex items-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : rightIcon ? (
            <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center">
              {rightIcon}
            </div>
          ) : null}
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

Input.displayName = 'Input';
