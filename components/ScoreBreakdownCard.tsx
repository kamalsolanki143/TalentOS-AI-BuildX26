'use client';

import React from 'react';
import type { ScoreBreakdown } from '@/types';
import { Sparkles, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

type ScoreBreakdownCardProps = {
  scoreBreakdown: ScoreBreakdown;
  summary?: string | null;
};

const DIMENSIONS = [
  { key: 'skill_fit' as const, label: 'Skill & Tech Alignment', weight: '30%' },
  { key: 'startup_fit' as const, label: 'Startup Mindset & Agility', weight: '25%' },
  { key: 'communication_fit' as const, label: 'Communication Clarity', weight: '20%' },
  { key: 'salary_fit' as const, label: 'Salary Expectation Match', weight: '15%' },
  { key: 'availability_fit' as const, label: 'Availability & Timeline', weight: '10%' },
];

function getScoreBadgeVariant(score: number): 'success' | 'accent' | 'warning' | 'danger' {
  if (score >= 80) return 'success';
  if (score >= 60) return 'accent';
  if (score >= 40) return 'warning';
  return 'danger';
}

function getProgressColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-indigo-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-rose-500';
}

export default function ScoreBreakdownCard({ scoreBreakdown, summary }: ScoreBreakdownCardProps) {
  return (
    <div className="space-y-4">
      {/* AI Summary Banner */}
      {summary && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-violet-50/80 border border-indigo-100/80 text-slate-800 shadow-soft-sm">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>AI Match Synthesis</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
        </div>
      )}

      {/* Dimension Breakdown Cards */}
      <div className="space-y-3">
        {DIMENSIONS.map(({ key, label, weight }) => {
          const dimension = scoreBreakdown[key];
          if (!dimension) return null;

          return (
            <Card key={key} variant="default" padding="sm" hoverEffect={false} className="border-slate-200/70">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{label}</span>
                  <span className="text-xs font-medium text-slate-400">({weight} weight)</span>
                </div>
                <Badge variant={getScoreBadgeVariant(dimension.score)} size="sm">
                  {dimension.score}/100
                </Badge>
              </div>

              {/* Score Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(dimension.score)}`}
                  style={{ width: `${dimension.score}%` }}
                />
              </div>

              {/* Rationale Bullet Points */}
              <ul className="space-y-1.5 pt-1">
                {dimension.reasons.map((reason, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-normal">
                    {dimension.score >= 60 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
