'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import ScoreBadge from './ScoreBadge';
import ScoreExplainer from './ScoreExplainer';
import type { ScoreBreakdown } from '@/types';
import { useToast } from '@/hooks/useToast';
import { Briefcase, CheckCircle2, Calendar, UserX } from 'lucide-react';

type CandidateCardProps = {
  name: string;
  role: string;
  score: number;
  status: string;
  summary?: string | null;
  scoreBreakdown?: ScoreBreakdown | null;
};

export default function CandidateCard({
  name,
  role,
  score,
  status: initialStatus,
  summary,
  scoreBreakdown,
}: CandidateCardProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState(initialStatus);

  const handleShortlist = () => {
    setStatus('Shortlisted');
    toast({
      title: `${name} Shortlisted`,
      description: `Moved candidate to top shortlist pipeline for ${role}.`,
      variant: 'success',
    });
  };

  const handleSchedule = () => {
    setStatus('Interview Scheduled');
    toast({
      title: `Interview Invite Dispatched`,
      description: `Calendar invite and screening prep kit sent to ${name}.`,
      variant: 'success',
    });
  };

  return (
    <Card variant="default" hoverEffect className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Avatar name={name} size="lg" status="online" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">{name}</h3>
            <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>Applied for {role}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center sm:items-end gap-2">
          <ScoreBadge score={score} />
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
            {status}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={handleShortlist}
          leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
        >
          Shortlist Candidate
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleSchedule}
          leftIcon={<Calendar className="w-3.5 h-3.5 text-indigo-600" />}
        >
          Schedule Interview
        </Button>
      </div>

      {/* Explainable AI breakdown section */}
      {scoreBreakdown && (
        <ScoreExplainer
          scoreBreakdown={scoreBreakdown}
          summary={summary}
          overallScore={score}
        />
      )}
    </Card>
  );
}
