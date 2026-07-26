'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import type { JobItem } from './JobCard';
import {
  Briefcase,
  MapPin,
  Sparkles,
  Share2,
  Copy,
  Archive,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface JobDetailsPanelProps {
  job: JobItem | null;
  onEdit?: (job: JobItem) => void;
  onDuplicate?: (job: JobItem) => void;
}

export const JobDetailsPanel: React.FC<JobDetailsPanelProps> = ({ job, onDuplicate }) => {
  const { toast } = useToast();

  if (!job) {
    return (
      <Card variant="default" padding="lg" className="text-center py-16 bg-slate-50/50">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Briefcase className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-900">Select a Job Requisition</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
          Click any job card on the left to inspect full requirements, AI candidate suggestions, and management tools.
        </p>
      </Card>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/apply/${job.id}`);
    toast({
      title: 'Portal Link Copied',
      description: `Shareable application link for ${job.title} copied to clipboard.`,
      variant: 'success',
    });
  };

  const handleDuplicate = () => {
    if (onDuplicate) onDuplicate(job);
    toast({
      title: 'Requisition Duplicated',
      description: `Created a draft copy of ${job.title}.`,
      variant: 'success',
    });
  };

  const handleArchive = () => {
    toast({
      title: 'Requisition Archived',
      description: `${job.title} has been moved to archived requisitions.`,
      variant: 'neutral',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions Card */}
      <Card variant="gradient" padding="lg" className="border-indigo-100 shadow-soft-md space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="primary" size="sm">{job.department}</Badge>
              <span className="text-xs font-semibold text-slate-500">• {job.employmentType}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{job.title}</h2>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location} • Posted {job.createdDate}
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-indigo-600 font-mono">{job.aiMatchAvg}</span>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Avg AI Score</span>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <Link href={`/apply/${job.id}`}>
            <Button variant="primary" size="sm" leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              Candidate Portal
            </Button>
          </Link>
          <Button variant="secondary" size="sm" onClick={handleShare} leftIcon={<Share2 className="w-3.5 h-3.5 text-indigo-600" />}>
            Share Link
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDuplicate} leftIcon={<Copy className="w-3.5 h-3.5 text-violet-600" />}>
            Duplicate
          </Button>
          <Button variant="ghost" size="sm" onClick={handleArchive} leftIcon={<Archive className="w-3.5 h-3.5 text-slate-500" />}>
            Archive
          </Button>
        </div>
      </Card>

      {/* AI Intelligence & Suggestions Panel */}
      <GlassCard glow padding="lg" className="bg-gradient-to-br from-white via-indigo-50/40 to-violet-50/40 border-indigo-100 shadow-soft-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-100/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">AI Requisition Intelligence</h4>
          </div>
          <Badge variant="success" size="sm">Optimized 98%</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-white p-3 rounded-xl border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Hiring Difficulty</span>
            <span className="text-sm font-bold text-indigo-600 mt-0.5 block">{job.aiDifficulty} Demand</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Est. Time to Hire</span>
            <span className="text-sm font-bold text-slate-900 mt-0.5 block">{job.hiringTimeline}</span>
          </div>
        </div>

        <div className="p-3 bg-white/80 rounded-xl border border-indigo-100/80 text-xs text-slate-700 leading-relaxed font-medium">
          ✨ {job.aiTips}
        </div>
      </GlassCard>

      {/* Job Description & Requirements */}
      <Card variant="default" padding="lg" className="space-y-6">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Role Overview</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Required Tech Stack &amp; Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Key Responsibilities</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Candidate Requirements</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};
