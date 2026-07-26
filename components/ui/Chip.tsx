'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  selected = false,
  avatar,
  icon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer select-none',
        selected
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-soft-sm'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300',
        className
      )}
      {...props}
    >
      {avatar && <span className="inline-flex shrink-0">{avatar}</span>}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
