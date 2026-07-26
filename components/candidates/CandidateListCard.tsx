'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CandidateItem {
  id: string;
  name: string;
  role: string;
  company: string;
  experienceYears: number;
  location: string;
  email: string;
  phone: string;
  linkedInUrl: string;
  aiScore: number;
  status: 'Applied' | 'Screening' | 'AI Ranked' | 'Interview' | 'Offer' | 'Hired';
  skills: string[];
  availability: string;
  salaryExpectation: string;
  summary: string;
  scoreBreakdown: {
    skillFit: number;
    startupFit: number;
    communication: number;
    salaryFit: number;
    availability: number;
  };
  pros: string[];
  cons: string[];
  missingSkills: string[];
  suggestedQuestions: string[];
  riskIndicator: 'Low' | 'Medium' | 'High';
  resumeUrl: string;
  education: string;
  lastActivity: string;
}

interface CandidateListCardProps {
  candidate: CandidateItem;
  isSelected?: boolean;
  onSelect: (candidate: CandidateItem) => void;
}

export const CandidateListCard: React.FC<CandidateListCardProps> = ({
  candidate,
  isSelected,
  onSelect,
}) => {
  const getStatusBadge = (status: CandidateItem['status']) => {
    switch (status) {
      case 'Hired':
        return <Badge variant="success" size="sm" dot>Hired</Badge>;
      case 'Offer':
        return <Badge variant="accent" size="sm">Offer Stage</Badge>;
      case 'Interview':
        return <Badge variant="primary" size="sm">Interview</Badge>;
      case 'AI Ranked':
        return <Badge variant="primary" size="sm" dot>AI Ranked</Badge>;
      case 'Screening':
        return <Badge variant="warning" size="sm">Screening</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Applied</Badge>;
    }
  };

  return (
    <Card
      variant="default"
      hoverEffect
      onClick={() => onSelect(candidate)}
      className={cn(
        'p-4 cursor-pointer transition-all duration-200 relative border select-none',
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/20 shadow-soft-md'
          : 'border-slate-200/80 hover:border-indigo-200 bg-white'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-3">
          <Avatar name={candidate.name} size="md" status="online" />
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">
              {candidate.name}
            </h4>
            <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
              <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{candidate.role}</span>
            </p>
          </div>
        </div>
        {getStatusBadge(candidate.status)}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            <Sparkles className="w-3 h-3" />
            {candidate.aiScore}/100
          </span>
          <span className="text-[11px] text-slate-400 font-medium">{candidate.experienceYears}y exp</span>
        </div>

        <ChevronRight className={cn('w-4 h-4 text-slate-400 transition-transform', isSelected && 'rotate-90 text-indigo-600')} />
      </div>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-1 mt-2.5">
        {candidate.skills.slice(0, 3).map((sk, idx) => (
          <span key={idx} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-md">
            {sk}
          </span>
        ))}
        {candidate.skills.length > 3 && (
          <span className="px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            +{candidate.skills.length - 3}
          </span>
        )}
      </div>
    </Card>
  );
};
