'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/hooks/useToast';
import type { CandidateItem } from './CandidateListCard';
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Briefcase,
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Calendar,
  UserX,
  Share2,
  MessageSquare,
} from 'lucide-react';

interface CandidateProfilePanelProps {
  candidate: CandidateItem | null;
  onStatusChange?: (candidateId: string, newStatus: CandidateItem['status']) => void;
}

export const CandidateProfilePanel: React.FC<CandidateProfilePanelProps> = ({
  candidate,
  onStatusChange,
}) => {
  const { toast } = useToast();
  const [noteText, setNoteText] = useState('');
  const [notesList, setNotesList] = useState<string[]>([
    'Candidate demonstrated deep Next.js App Router understanding in initial technical screening call.',
  ]);

  if (!candidate) {
    return (
      <Card variant="default" padding="lg" className="text-center py-20 bg-slate-50/50">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Briefcase className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-900">Select a Candidate Profile</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
          Click any candidate card on the left to inspect full background, PDF resume preview, and AI insights.
        </p>
      </Card>
    );
  }

  const handleShortlist = () => {
    if (onStatusChange) onStatusChange(candidate.id, 'AI Ranked');
    toast({
      title: `${candidate.name} Shortlisted`,
      description: 'Candidate moved to AI Ranked shortlisted stage.',
      variant: 'success',
    });
  };

  const handleSchedule = () => {
    if (onStatusChange) onStatusChange(candidate.id, 'Interview');
    toast({
      title: 'Interview Invite Scheduled',
      description: `Interview prep kit dispatched to ${candidate.email}.`,
      variant: 'success',
    });
  };

  const handleReject = () => {
    toast({
      title: 'Candidate Rejection Logged',
      description: `Rejection email queued for ${candidate.name}.`,
      variant: 'warning',
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/dashboard/candidates?id=${candidate.id}`);
    toast({
      title: 'Candidate Link Copied',
      description: `Shareable evaluation link for ${candidate.name} copied to clipboard.`,
      variant: 'success',
    });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setNotesList([noteText, ...notesList]);
    setNoteText('');
    toast({
      title: 'Recruiter Note Saved',
      description: 'Added internal candidate feedback note.',
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card variant="gradient" padding="lg" className="border-indigo-100 shadow-soft-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={candidate.name} size="xl" status="online" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{candidate.name}</h2>
                <Badge variant="primary" size="sm">{candidate.status}</Badge>
              </div>
              <p className="text-xs font-semibold text-indigo-600 mt-0.5">{candidate.role} at {candidate.company}</p>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {candidate.location} • {candidate.experienceYears} Years Exp
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-indigo-600 font-mono">{candidate.aiScore}</span>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">AI Match Score</span>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">{candidate.email}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">{candidate.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Linkedin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <a href={candidate.linkedInUrl} target="_blank" rel="noreferrer" className="truncate hover:underline text-indigo-600">
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Candidate Actions Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <Button variant="primary" size="sm" onClick={handleShortlist} leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}>
            Shortlist
          </Button>
          <Button variant="secondary" size="sm" onClick={handleSchedule} leftIcon={<Calendar className="w-3.5 h-3.5 text-indigo-600" />}>
            Schedule Interview
          </Button>
          <Button variant="secondary" size="sm" onClick={handleShare} leftIcon={<Share2 className="w-3.5 h-3.5 text-violet-600" />}>
            Share Profile
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReject} leftIcon={<UserX className="w-3.5 h-3.5 text-rose-500" />}>
            Reject
          </Button>
        </div>
      </Card>

      {/* Resume Viewer Simulator */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">Parsed PDF Resume</h4>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Download PDF
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<Printer className="w-3.5 h-3.5" />}>
              Print
            </Button>
          </div>
        </div>

        <div className="p-6 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs space-y-3 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
            <span>RESUME_PARSER_OUTPUT.pdf</span>
            <span className="text-emerald-400">Verified Parse 100%</span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">{candidate.summary}</p>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Education: {candidate.education}</span>
            <span>Availability: {candidate.availability}</span>
          </div>
        </div>
      </Card>

      {/* Skills & Experience Overview */}
      <Card variant="default" padding="lg" className="space-y-6">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Verified Skills</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recruiter Notes */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">Recruiter Notes</h4>
          </div>

          <form onSubmit={handleAddNote} className="space-y-2">
            <Textarea
              rows={2}
              placeholder="Add internal feedback for founder review..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <Button type="submit" variant="secondary" size="sm">
              Add Note
            </Button>
          </form>

          <div className="space-y-2 pt-2">
            {notesList.map((note, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                {note}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
