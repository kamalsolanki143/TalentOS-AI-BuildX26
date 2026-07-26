'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, CheckCircle2, Star, Building2, Zap, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      {/* Ambient Lighting Blobs (Step 6) */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl -z-10" />

      {/* Main Split-Screen Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl border border-slate-200/80 shadow-soft-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* LEFT SIDE — Brand & Testimonial Showcase */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-900 via-slate-900 to-violet-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Circle */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-2xl" />

          {/* Top Brand Header */}
          <div className="space-y-6 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Talent<span className="text-indigo-400">OS</span>
              </span>
            </Link>

            <div className="space-y-3">
              <Badge variant="primary" size="sm" className="bg-indigo-500/20 text-indigo-200 border-indigo-400/30">
                BuildX’26 Platform
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Hire Top 1% Startup Talent 10x Faster
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                TalentOS automates candidate screening, semantic fit scoring, and recruitment workflows with transparent explainable AI.
              </p>
            </div>

            {/* Feature Bullet Points */}
            <div className="space-y-3 pt-2 text-xs font-medium text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Explainable 0–100 Score Rationales</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-Click Shortlist Kanban Pipeline Board</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Demographic Bias (EEOC Compliant)</span>
              </div>
            </div>
          </div>

          {/* Bottom Founder Testimonial Card */}
          <div className="pt-8 relative z-10">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-200 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="italic leading-relaxed">
                &quot;TalentOS reduced our screening time from 23 hours to under 3 hours while finding our Founding Frontend Engineer.&quot;
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span className="font-semibold text-white">Alex Rivera — Founder, HyperScale AI</span>
                <span className="flex items-center gap-1 text-indigo-300 font-mono"><Zap className="w-3 h-3" /> Antler Cohort</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Glassmorphic Auth Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
          {children}
        </div>
      </div>
    </div>
  );
};
