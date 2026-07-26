'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const AIInsightsPanel: React.FC = () => {
  return (
    <GlassCard glow padding="lg" className="bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/40 border-slate-200/80 shadow-soft-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">AI Co-Pilot Insights</h3>
            <p className="text-xs text-slate-500">Real-time candidate recommendations &amp; confidence ratings</p>
          </div>
        </div>
        <Badge variant="primary" size="sm" dot>94.8% Confidence</Badge>
      </div>

      {/* Top Candidate Recommendation */}
      <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-soft-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name="Rahul Sharma" size="lg" status="online" />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-900">Rahul Sharma</h4>
                <Badge variant="success" size="sm">Top Fit</Badge>
              </div>
              <p className="text-xs text-slate-500">Applied for Lead Frontend Engineer</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-600 font-mono">95</span>
            <span className="text-xs text-slate-400 font-bold block">/100 Fit</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100/60 leading-relaxed font-medium">
          ✨ Recommendation: Immediate Interview. Direct Next.js expertise, 98% startup agility score, immediate availability.
        </p>
      </div>

      {/* Mini AI Metrics Row */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-3 bg-white rounded-xl border border-slate-200/70">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Average AI Score</span>
          <span className="text-xl font-bold text-slate-900 font-mono">84.2 / 100</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200/70">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Most Active Job</span>
          <span className="text-xs font-bold text-indigo-600 truncate block mt-1">Lead Frontend Engineer</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <Link href="/dashboard/candidates">
          <Button variant="primary" size="md" className="w-full justify-center" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Inspect All Candidate Scorecards
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
};
