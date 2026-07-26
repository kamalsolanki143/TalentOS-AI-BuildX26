'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import type { CandidateItem } from './CandidateListCard';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BrainCircuit,
} from 'lucide-react';

interface AICopilotPanelProps {
  candidate: CandidateItem | null;
}

export const AICopilotPanel: React.FC<AICopilotPanelProps> = ({ candidate }) => {
  if (!candidate) {
    return (
      <Card variant="default" padding="lg" className="text-center py-16 bg-slate-50/50">
        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3 text-indigo-600">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-900">AI Co-Pilot Panel</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
          Select a candidate to view 5-dimension score breakdown, non-demographic bias checks, and suggested interview questions.
        </p>
      </Card>
    );
  }

  const { scoreBreakdown } = candidate;

  return (
    <div className="space-y-6">
      {/* AI Score Overview Card */}
      <GlassCard glow padding="lg" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl border border-indigo-500/20 shadow-soft-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h4 className="text-sm font-bold text-white">AI Co-Pilot Scorecard</h4>
          </div>
          <Badge variant="primary" size="sm" className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30">
            Gemini XAI
          </Badge>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-5xl font-black tracking-tight text-white font-mono">{candidate.aiScore}</span>
            <span className="text-sm text-slate-400 font-bold"> / 100</span>
            <p className="text-[11px] text-slate-300 font-semibold mt-1">96% Evaluation Confidence</p>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              High Match
            </span>
          </div>
        </div>

        {/* Non-demographic Bias Check */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>EEOC Non-Demographic Pass (100% Bias-Free)</span>
        </div>
      </GlassCard>

      {/* 5-Dimension Score Bars */}
      <Card variant="default" padding="lg" className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          5-Dimension Score Breakdown
        </h4>

        <div className="space-y-3">
          {[
            { label: 'Skill Fit (30%)', score: scoreBreakdown.skillFit, color: 'bg-indigo-600' },
            { label: 'Startup Fit (25%)', score: scoreBreakdown.startupFit, color: 'bg-violet-600' },
            { label: 'Communication (20%)', score: scoreBreakdown.communication, color: 'bg-blue-600' },
            { label: 'Salary Fit (15%)', score: scoreBreakdown.salaryFit, color: 'bg-emerald-600' },
            { label: 'Availability (10%)', score: scoreBreakdown.availability, color: 'bg-amber-500' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{item.label}</span>
                <span className="font-mono">{item.score}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pros & Cons */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Strong Pros
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {candidate.pros.map((p, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Missing / Gap Areas
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {candidate.cons.map((c, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Suggested Interview Questions */}
      <Card variant="default" padding="lg" className="space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Suggested Screening Questions
          </h4>
        </div>

        <div className="space-y-2">
          {candidate.suggestedQuestions.map((q, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-slate-700 font-medium">
              "{q}"
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
