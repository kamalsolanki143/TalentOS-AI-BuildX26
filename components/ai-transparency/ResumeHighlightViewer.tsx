'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, FileText } from 'lucide-react';

export const ResumeHighlightViewer: React.FC = () => {
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(
    'Next.js 14 App Router'
  );

  const highlights = [
    {
      id: 'h1',
      text: 'Next.js 14 App Router',
      category: 'Skill Match',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      reason: 'Matched required core technical framework tag with 98% confidence.',
      evidence: 'Architected production frontend serving 50k active users.',
    },
    {
      id: 'h2',
      text: '4 Years Lead Frontend Experience',
      category: 'Experience Depth',
      color: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      reason: 'Exceeds the 3+ years experience minimum threshold for senior role.',
      evidence: 'Promoted to Lead Frontend Engineer in 2024 at HyperScale Labs.',
    },
    {
      id: 'h3',
      text: 'Stanford University Computer Science B.S.',
      category: 'Education',
      color: 'bg-purple-100 text-purple-900 border-purple-300',
      reason: 'Relevant CS degree from accredited computer science institution.',
      evidence: 'Degree verified via resume transcript parsing pass.',
    },
    {
      id: 'h4',
      text: '0->1 Startup Ownership',
      category: 'Startup Culture Fit',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      reason: 'Demonstrates founder-aligned autonomy and fast execution velocity.',
      evidence: 'Shipped 12 major product features in 6 months.',
    },
  ];

  const activeInfo = highlights.find((h) => h.text === selectedHighlight) || highlights[0];

  return (
    <Card variant="default" padding="lg" className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Interactive Resume Parsing Highlights</h3>
        </div>
        <Badge variant="primary" size="sm">Click Highlight to Inspect AI Rationale</Badge>
      </div>

      {/* Simulated Resume Document */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 font-sans text-xs text-slate-700 leading-relaxed space-y-4 shadow-inner">
        <div className="border-b border-slate-200 pb-3">
          <h4 className="text-base font-bold text-slate-900">Rahul Sharma</h4>
          <p className="text-xs text-slate-500">San Francisco, CA • rahul.sharma@example.com</p>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400 mb-1.5">Professional Summary</h5>
          <p>
            Senior Engineer with{' '}
            <mark
              onClick={() => setSelectedHighlight('4 Years Lead Frontend Experience')}
              className="px-1.5 py-0.5 rounded cursor-pointer transition-all bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-medium"
            >
              4 Years Lead Frontend Experience
            </mark>{' '}
            specializing in building scale web applications. Deep expertise in{' '}
            <mark
              onClick={() => setSelectedHighlight('Next.js 14 App Router')}
              className="px-1.5 py-0.5 rounded cursor-pointer transition-all bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold"
            >
              Next.js 14 App Router
            </mark>
            , React, and TypeScript.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400 mb-1.5">Work Experience</h5>
          <p>
            <strong>HyperScale Labs — Lead Frontend Engineer</strong> (2022 – Present)<br />
            Proven track record in{' '}
            <mark
              onClick={() => setSelectedHighlight('0->1 Startup Ownership')}
              className="px-1.5 py-0.5 rounded cursor-pointer transition-all bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium"
            >
              0 → 1 Startup Ownership
            </mark>
            , leading component design systems and state management optimization.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-400 mb-1.5">Education</h5>
          <p>
            <mark
              onClick={() => setSelectedHighlight('Stanford University Computer Science B.S.')}
              className="px-1.5 py-0.5 rounded cursor-pointer transition-all bg-purple-100 hover:bg-purple-200 text-purple-900 font-medium"
            >
              Stanford University Computer Science B.S.
            </mark>
          </p>
        </div>
      </div>

      {/* Rationale Drawer for Selected Highlight */}
      <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-900">{`Why AI Detected "${activeInfo.text}"`}</span>
          </div>
          <Badge variant="success" size="sm">{activeInfo.category}</Badge>
        </div>

        <p className="text-slate-700"><strong>AI Detection Reason:</strong> {activeInfo.reason}</p>
        <p className="text-slate-600"><strong>Empirical Evidence:</strong> {`"${activeInfo.evidence}"`}</p>
      </div>
    </Card>
  );
};
