'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, Filter, CheckCircle2, Send } from 'lucide-react';

export const HiringFunnel: React.FC = () => {
  const funnelStages = [
    { stage: 'Applied', count: 84, percent: 100, color: 'bg-indigo-600', icon: <Users className="w-4 h-4 text-indigo-600" /> },
    { stage: 'AI Screened', count: 62, percent: 74, color: 'bg-violet-600', icon: <Filter className="w-4 h-4 text-violet-600" /> },
    { stage: 'Top Ranked (>75)', count: 36, percent: 43, color: 'bg-blue-600', icon: <CheckCircle2 className="w-4 h-4 text-blue-600" /> },
    { stage: 'Interview Stage', count: 14, percent: 17, color: 'bg-amber-500', icon: <Send className="w-4 h-4 text-amber-600" /> },
    { stage: 'Offer Sent', count: 6, percent: 7, color: 'bg-emerald-600', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
  ];

  return (
    <Card variant="default" padding="lg" className="shadow-soft-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Filter className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">Conversion Hiring Funnel</h3>
          </div>
          <p className="text-xs text-slate-500">Live applicant progression from application to final offer</p>
        </div>
        <Badge variant="success" size="sm" dot>85% Time Reduction</Badge>
      </div>

      <div className="space-y-4">
        {funnelStages.map((stage, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <span className="p-1 rounded-md bg-slate-50 border border-slate-100">{stage.icon}</span>
                <span>{stage.stage}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{stage.count} candidates</span>
                <span className="text-slate-400 font-mono text-[11px]">({stage.percent}%)</span>
              </div>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${stage.color}`}
                style={{ width: `${stage.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
