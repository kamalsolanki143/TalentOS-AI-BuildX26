'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import type { CandidateItem } from './CandidateListCard';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface CandidateCompareTableProps {
  candidates: CandidateItem[];
}

export const CandidateCompareTable: React.FC<CandidateCompareTableProps> = ({ candidates }) => {
  if (candidates.length === 0) {
    return (
      <Card variant="default" padding="lg" className="text-center py-16">
        <h4 className="text-base font-bold text-slate-900">No Candidates Selected for Comparison</h4>
        <p className="text-xs text-slate-500 mt-1">Select 2 or more candidates to view side-by-side skill matrix.</p>
      </Card>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft-xl overflow-x-auto select-none">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 font-bold text-slate-700 w-48">Candidate Metrics</th>
            {candidates.map((c) => (
              <th key={c.id} className="p-4 min-w-[220px]">
                <div className="flex items-center gap-3">
                  <Avatar name={c.name} size="md" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{c.name}</h5>
                    <p className="text-[11px] text-slate-500">{c.role}</p>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {/* AI Score */}
          <tr>
            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">AI Match Score</td>
            {candidates.map((c) => (
              <td key={c.id} className="p-4 font-mono font-bold text-base text-indigo-600">
                <span className="inline-flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  {c.aiScore}/100
                </span>
              </td>
            ))}
          </tr>

          {/* Experience */}
          <tr>
            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Experience</td>
            {candidates.map((c) => (
              <td key={c.id} className="p-4 font-medium text-slate-700">
                {c.experienceYears} Years ({c.company})
              </td>
            ))}
          </tr>

          {/* Top Skills */}
          <tr>
            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Tech Stack &amp; Skills</td>
            {candidates.map((c) => (
              <td key={c.id} className="p-4">
                <div className="flex flex-wrap gap-1">
                  {c.skills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* Salary Expectation */}
          <tr>
            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Salary Expectation</td>
            {candidates.map((c) => (
              <td key={c.id} className="p-4 font-mono text-slate-700">
                {c.salaryExpectation}
              </td>
            ))}
          </tr>

          {/* Availability */}
          <tr>
            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Availability</td>
            {candidates.map((c) => (
              <td key={c.id} className="p-4 font-medium text-slate-700">
                {c.availability}
              </td>
            ))}
          </tr>

          {/* Key Strengths */}
          <tr>
            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Key Strengths</td>
            {candidates.map((c) => (
              <td key={c.id} className="p-4 text-slate-600">
                <ul className="space-y-1">
                  {c.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
