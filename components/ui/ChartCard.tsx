'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';
import { BarChart3, TrendingUp } from 'lucide-react';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  metric?: string;
  badgeText?: string;
  badgeVariant?: 'success' | 'accent' | 'primary' | 'warning';
  data?: number[];
  labels?: string[];
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  metric = '84%',
  badgeText = '+14.2% MoM',
  badgeVariant = 'success',
  data = [40, 55, 35, 70, 65, 85, 95],
  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  className,
}) => {
  const maxValue = Math.max(...data, 100);

  return (
    <Card variant="default" hoverEffect className={cn('flex flex-col justify-between', className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100/80">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h4 className="text-card-title text-slate-900 font-semibold tracking-tight">{title}</h4>
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {badgeText && (
          <Badge variant={badgeVariant} size="sm" leftIcon={<TrendingUp className="w-3 h-3" />}>
            {badgeText}
          </Badge>
        )}
      </div>

      <div className="mt-2 mb-4">
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{metric}</div>
      </div>

      {/* SVG Bar Chart Visualization */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-end justify-between gap-2 h-24 pt-2">
          {data.map((val, idx) => {
            const heightPercent = (val / maxValue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                <div className="w-full bg-slate-100 rounded-t-lg h-full flex items-end overflow-hidden relative">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-violet-500 rounded-t-lg transition-all duration-500 group-hover:from-indigo-500 group-hover:to-violet-400"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                {labels[idx] && (
                  <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
                    {labels[idx]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
