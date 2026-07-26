'use client';

import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingProps {
  label?: string;
  text?: string;
  fullPage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  label,
  text,
  fullPage = false,
  size = 'md',
  className,
}) => {
  const displayLabel = label || text || 'Loading TalentOS AI...';

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const content = (
    <div className={cn('flex flex-col items-center justify-center p-8 space-y-4 text-center', className)}>
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-gradient-glow animate-pulse">
          <Sparkles className="w-7 h-7 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <Loader2 className={cn('absolute -top-1 -right-1 text-indigo-600 animate-spin', sizes[size])} />
      </div>
      {displayLabel && <p className="text-sm font-semibold text-slate-700 animate-fadeIn">{displayLabel}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};
