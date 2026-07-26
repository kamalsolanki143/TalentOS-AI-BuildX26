'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const AuditLogTable: React.FC = () => {
  const auditLogs = [
    {
      timestamp: '2026-07-26 10:14:02',
      action: 'RESUME_PARSED',
      confidence: '99%',
      decision: 'Extracted 9 Skills',
      explanation: 'PDF parsed with zero syntax errors.',
      reviewer: 'System AI Engine',
    },
    {
      timestamp: '2026-07-26 10:14:03',
      action: 'BIAS_AUDIT_FILTER',
      confidence: '100%',
      decision: 'PASSED',
      explanation: 'Demographic attributes masked for blind scoring.',
      reviewer: 'EEOC Auditor System',
    },
    {
      timestamp: '2026-07-26 10:14:04',
      action: 'SCORE_CALCULATION',
      confidence: '96%',
      decision: '95/100 Fit',
      explanation: 'Skill Fit (98%), Startup Fit (95%), Availability (100%).',
      reviewer: 'Gemini XAI Evaluator',
    },
    {
      timestamp: '2026-07-26 10:14:05',
      action: 'HUMAN_APPROVAL',
      confidence: '100%',
      decision: 'SHORTLISTED',
      explanation: 'Founder approved AI recommendation and scheduled interview.',
      reviewer: 'Founder Workspace',
    },
  ];

  return (
    <Card variant="default" padding="lg" className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Immutable AI Audit Log Table</h3>
          <p className="text-xs text-slate-500">Audit-compliant log of all evaluation events and human reviews</p>
        </div>
        <Badge variant="success" size="sm">Audit Ready</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
            <tr>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Action Type</th>
              <th className="p-3">Confidence</th>
              <th className="p-3">Decision</th>
              <th className="p-3">Explanation Rationale</th>
              <th className="p-3">Reviewer / System</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
            {auditLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="p-3 text-[11px] text-slate-500">{log.timestamp}</td>
                <td className="p-3 font-bold text-indigo-600">{log.action}</td>
                <td className="p-3 text-emerald-600 font-bold">{log.confidence}</td>
                <td className="p-3 font-bold text-slate-900">{log.decision}</td>
                <td className="p-3 font-sans text-xs text-slate-600">{log.explanation}</td>
                <td className="p-3 font-sans text-xs text-slate-500">{log.reviewer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
