'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, DollarSign, Users, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface JobItem {
  id: string;
  title: string;
  department: string;
  employmentType: string;
  location: string;
  salaryRange: string;
  applicantsCount: number;
  aiMatchAvg: number;
  createdDate: string;
  status: 'Active' | 'Draft' | 'Closed';
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  hiringTimeline: string;
  aiDifficulty: 'Low' | 'Medium' | 'High';
  aiTips: string;
}

interface JobCardProps {
  job: JobItem;
  isSelected?: boolean;
  onSelect: (job: JobItem) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onSelect }) => {
  const getStatusBadge = (status: JobItem['status']) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success" size="sm" dot>Active</Badge>;
      case 'Draft':
        return <Badge variant="warning" size="sm">Draft</Badge>;
      case 'Closed':
        return <Badge variant="neutral" size="sm">Closed</Badge>;
    }
  };

  return (
    <Card
      variant="default"
      hoverEffect
      onClick={() => onSelect(job)}
      className={cn(
        'p-5 cursor-pointer transition-all duration-200 relative border',
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/20 shadow-soft-md'
          : 'border-slate-200/80 hover:border-indigo-200 bg-white'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 rounded-md">
              {job.department}
            </span>
            <span className="text-[11px] text-slate-400">• {job.employmentType}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
            {job.title}
          </h3>
        </div>
        {getStatusBadge(job.status)}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <DollarSign className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-mono">{job.salaryRange}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-slate-900">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            {job.applicantsCount} applicants
          </span>
          <span className="flex items-center gap-1 font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            <Sparkles className="w-3 h-3" />
            {job.aiMatchAvg}/100 AI Match
          </span>
        </div>

        <ChevronRight className={cn('w-4 h-4 text-slate-400 transition-transform', isSelected && 'rotate-90 text-indigo-600')} />
      </div>
    </Card>
  );
};
