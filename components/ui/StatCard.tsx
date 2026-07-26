'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  period?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  period = 'vs last month',
  icon,
  className,
}) => {
  const trendColors = {
    positive: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    negative: 'text-rose-700 bg-rose-50 border-rose-100',
    neutral: 'text-slate-700 bg-slate-100 border-slate-200',
  };

  const TrendIcon = changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus;

  return (
    <Card variant="default" hoverEffect className={cn('flex flex-col justify-between', className)}>
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">{title}</span>
        {icon && (
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>

        {change && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold border',
                trendColors[changeType]
              )}
            >
              <TrendIcon className="w-3 h-3" />
              {change}
            </span>
            <span className="text-slate-700">{period}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
