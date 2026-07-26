import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'accent' | 'outline' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  leftIcon,
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-100/80',
    secondary: 'bg-violet-50 text-violet-700 border-violet-100/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-100/80',
    danger: 'bg-red-50 text-red-700 border-red-100/80',
    accent: 'bg-blue-50 text-blue-700 border-blue-100/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200/80',
    outline: 'bg-white text-slate-700 border-slate-200 shadow-soft-sm',
  };

  const dotColors = {
    primary: 'bg-indigo-500',
    secondary: 'bg-violet-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    accent: 'bg-blue-500',
    neutral: 'bg-slate-400',
    outline: 'bg-indigo-500',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium rounded-md',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium rounded-lg',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold rounded-xl',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border tracking-tight select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
    </span>
  );
};
