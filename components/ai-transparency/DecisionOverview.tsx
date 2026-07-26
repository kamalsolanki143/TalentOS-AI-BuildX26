'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck } from 'lucide-react';

export const DecisionOverview: React.FC = () => {
  return (
    <GlassCard glow padding="lg" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl border border-indigo-500/20 shadow-soft-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm" className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30">
              Audit-Ready Deterministic AI
            </Badge>
            <span className="text-xs font-mono text-slate-400">Model: Gemini Flash XAI v2.6</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Evaluation Summary</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold rounded-full flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 100% Bias-Free Audit Pass
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <span className="text-4xl font-black text-white font-mono">95</span>
          <span className="text-sm text-slate-400 font-bold"> / 100</span>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Overall Match Score</p>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <span className="text-4xl font-black text-emerald-400 font-mono">96%</span>
          <p className="text-[11px] text-slate-400 font-medium mt-1">AI Evaluation Confidence</p>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <span className="text-xl font-bold text-indigo-300 uppercase tracking-wider block mt-2">Strong Hire</span>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Recommendation</p>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <span className="text-xl font-bold text-emerald-400 uppercase tracking-wider block mt-2">Low Risk</span>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Hiring Risk Index</p>
        </div>
      </div>
    </GlassCard>
  );
};
