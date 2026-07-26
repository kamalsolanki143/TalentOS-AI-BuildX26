'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Upload, Cpu, Sparkles, ShieldCheck, UserCheck } from 'lucide-react';

export const DecisionTimeline: React.FC = () => {
  const steps = [
    {
      time: '10:14:02 AM',
      title: 'Resume Upload & Verification',
      desc: 'PDF document ingested & verified via checksum.',
      icon: <Upload className="w-4 h-4 text-indigo-600" />,
      badge: 'Completed',
    },
    {
      time: '10:14:03 AM',
      title: 'Semantic Skill & Experience Extraction',
      desc: 'Extracted 9 core skills and 4 years experience depth.',
      icon: <Cpu className="w-4 h-4 text-violet-600" />,
      badge: '98% Confident',
    },
    {
      time: '10:14:03 AM',
      title: 'EEOC Blind Bias Filter Pass',
      desc: 'Stripped demographic identifiers for fair evaluation.',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      badge: '100% Passed',
    },
    {
      time: '10:14:04 AM',
      title: '5-Dimension Score Calculation',
      desc: 'Computed weighted scores across Skill Fit, Startup Fit, and Salary.',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      badge: '95/100 Calculated',
    },
    {
      time: '10:14:05 AM',
      title: 'Founder Review & Approval',
      desc: 'Candidate shortlisted by Founder with recruiter notes.',
      icon: <UserCheck className="w-4 h-4 text-indigo-600" />,
      badge: 'Shortlisted',
    },
  ];

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900">AI Decision Execution Timeline</h3>
        <Badge variant="neutral" size="sm">Audit Logged</Badge>
      </div>

      <div className="relative border-l-2 border-slate-200 pl-6 space-y-6 ml-3">
        {steps.map((st, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center shadow-sm">
              {st.icon}
            </div>

            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">{st.title}</h4>
              <span className="text-[10px] font-mono text-slate-400">{st.time}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{st.desc}</p>
            <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded-md">
              {st.badge}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
