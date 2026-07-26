'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/ui/Navbar';
import { Sidebar } from '@/components/ui/Sidebar';
import { StatCard } from '@/components/ui/StatCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { JobCard, JobItem } from '@/components/jobs/JobCard';
import { JobDetailsPanel } from '@/components/jobs/JobDetailsPanel';
import { CreateJobWizard } from '@/components/jobs/CreateJobWizard';
import {
  Briefcase,
  PlusCircle,
  Search,
  CheckCircle2,
  FileText,
  XCircle,
} from 'lucide-react';

const initialJobs: JobItem[] = [
  {
    id: 'job-1',
    title: 'Lead Frontend Engineer',
    department: 'Engineering',
    employmentType: 'Full-Time / Founding',
    location: 'Remote (Worldwide)',
    salaryRange: '$120,000 - $150,000 / yr',
    applicantsCount: 42,
    aiMatchAvg: 95,
    createdDate: '2 days ago',
    status: 'Active',
    description: 'We are hiring a Lead Frontend Engineer to take complete ownership of TalentOS AI web applications. You will work directly with early-stage founders to build production-grade, highly performant React/Next.js components.',
    requirements: [
      '3+ years of production experience with React, Next.js App Router, and TypeScript.',
      'Deep understanding of state management, Tailwind CSS, and Framer Motion animations.',
      'Proven track record in 0->1 early-stage startup environments.',
    ],
    responsibilities: [
      'Architect, develop, and maintain Next.js web application interfaces.',
      'Collaborate with AI engineers to integrate Gemini Flash candidate scoring APIs.',
      'Enforce high code quality, component modularity, and accessibility standards.',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    hiringTimeline: '12 Days',
    aiDifficulty: 'Medium',
    aiTips: 'High candidate availability in North America and Europe. Focus screening on Next.js 14 App Router experience.',
  },
  {
    id: 'job-2',
    title: 'UI/UX Product Designer',
    department: 'Product Design',
    employmentType: 'Full-Time',
    location: 'San Francisco, CA / Remote',
    salaryRange: '$100,000 - $130,000 / yr',
    applicantsCount: 28,
    aiMatchAvg: 88,
    createdDate: '4 days ago',
    status: 'Active',
    description: 'Looking for a Senior UI/UX Product Designer to design world-class SaaS interfaces inspired by Linear, Stripe, Vercel, and Clerk.',
    requirements: [
      '4+ years designing high-end SaaS software products.',
      'Mastery of Figma, design systems, glassmorphism, and micro-interactions.',
      'Strong portfolio demonstrating complex dashboard workflows.',
    ],
    responsibilities: [
      'Create high-fidelity mockups, design tokens, and component specifications.',
      'Conduct user testing sessions with early-stage startup founders.',
    ],
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Micro-Interactions', 'Prototyping'],
    hiringTimeline: '14 Days',
    aiDifficulty: 'Low',
    aiTips: 'Candidates with design system experience score 15% higher on candidate retention.',
  },
  {
    id: 'job-3',
    title: 'Backend Systems Engineer',
    department: 'Engineering',
    employmentType: 'Full-Time',
    location: 'Remote',
    salaryRange: '$110,000 - $140,000 / yr',
    applicantsCount: 14,
    aiMatchAvg: 78,
    createdDate: '1 week ago',
    status: 'Active',
    description: 'Architect scalable API routes, Supabase database schemas, and LLM inference pipelines for TalentOS candidate ranking.',
    requirements: [
      '3+ years Node.js, PostgreSQL, and Supabase database optimization experience.',
      'Familiarity with OpenAI / Google Gemini API streaming handlers.',
    ],
    responsibilities: [
      'Build resilient backend microservices and webhooks.',
      'Optimize database queries for sub-second candidate evaluation passes.',
    ],
    skills: ['Node.js', 'PostgreSQL', 'Supabase', 'Python', 'REST APIs'],
    hiringTimeline: '18 Days',
    aiDifficulty: 'High',
    aiTips: 'Consider widening salary ceiling slightly to attract senior distributed systems engineers.',
  },
  {
    id: 'job-4',
    title: 'Growth Marketing Lead',
    department: 'Growth & Marketing',
    employmentType: 'Contractor',
    location: 'Remote',
    salaryRange: '$60 - $80 / hr',
    applicantsCount: 8,
    aiMatchAvg: 72,
    createdDate: '2 weeks ago',
    status: 'Draft',
    description: 'Drive founder acquisition and marketing campaigns across developer and founder communities.',
    requirements: [
      '2+ years B2B SaaS growth marketing experience.',
      'Proven experience scaling organic founder channels.',
    ],
    responsibilities: [
      'Launch developer marketing campaigns and founder onboarding webinars.',
    ],
    skills: ['Growth Marketing', 'SEO', 'Content Strategy', 'Copywriting'],
    hiringTimeline: '20 Days',
    aiDifficulty: 'Medium',
    aiTips: 'Draft status — complete screening questions before publishing live.',
  },
];

export default function JobsPage() {
  const [jobsList, setJobsList] = useState<JobItem[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(initialJobs[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Compute stat card metrics
  const totalJobs = jobsList.length;
  const activeJobs = jobsList.filter((j) => j.status === 'Active').length;
  const draftJobs = jobsList.filter((j) => j.status === 'Draft').length;
  const closedJobs = jobsList.filter((j) => j.status === 'Closed').length;

  // Filter jobs
  const filteredJobs = jobsList.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || j.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || j.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleJobCreated = (newJob: JobItem) => {
    setJobsList([newJob, ...jobsList]);
    setSelectedJob(newJob);
  };

  const handleDuplicateJob = (jobToDup: JobItem) => {
    const duplicated: JobItem = {
      ...jobToDup,
      id: `job-${Date.now()}`,
      title: `${jobToDup.title} (Copy)`,
      status: 'Draft',
      createdDate: 'Just now',
    };
    setJobsList([duplicated, ...jobsList]);
    setSelectedJob(duplicated);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-ambient-light">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />

          <PageWrapper className="p-4 sm:p-6 lg:p-8 space-y-8">
            <Container size="xl">
              {/* TOP HEADER SECTION */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="primary" size="sm" dot>ATS Requisition Management</Badge>
                    <span className="text-xs font-medium text-slate-400">BuildX Workspace</span>
                  </div>
                  <h1 className="text-page-title text-slate-900 font-bold tracking-tight">
                    Job Requisitions &amp; Role Postings
                  </h1>
                  <p className="text-small-custom text-slate-500 mt-1">
                    Manage active job openings, run AI requisition audits, and track candidate applicant throughput.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsWizardOpen(true)}
                  leftIcon={<PlusCircle className="w-4 h-4" />}
                  className="shadow-gradient-glow shrink-0"
                >
                  Create Job Requisition
                </Button>
              </div>

              {/* STAT CARDS ROW */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <StatCard title="Total Jobs" value={totalJobs.toString()} change="All Openings" changeType="positive" icon={<Briefcase className="w-4 h-4" />} />
                <StatCard title="Active Jobs" value={activeJobs.toString()} change="Live on Portal" changeType="positive" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />} />
                <StatCard title="Draft Jobs" value={draftJobs.toString()} change="In Configuration" changeType="neutral" icon={<FileText className="w-4 h-4 text-amber-500" />} />
                <StatCard title="Closed Jobs" value={closedJobs.toString()} change="Positions Filled" changeType="neutral" icon={<XCircle className="w-4 h-4 text-slate-400" />} />
              </div>

              {/* ACTION TOOLBAR BAR */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm">
                <div className="w-full sm:w-80">
                  <Input
                    placeholder="Search job title, skills, or department..."
                    leftIcon={<Search className="w-4 h-4" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <div className="w-36">
                    <Select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      options={[
                        { value: 'All', label: 'All Depts' },
                        { value: 'Engineering', label: 'Engineering' },
                        { value: 'Product Design', label: 'Product Design' },
                        { value: 'Growth & Marketing', label: 'Growth' },
                      ]}
                    />
                  </div>

                  <div className="w-32">
                    <Select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      options={[
                        { value: 'All', label: 'All Status' },
                        { value: 'Active', label: 'Active' },
                        { value: 'Draft', label: 'Draft' },
                        { value: 'Closed', label: 'Closed' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* TWO-COLUMN MAIN CONTENT (Left: Job Cards, Right: Job Details) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                {/* Left Column Job Cards List */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Requisitions ({filteredJobs.length})
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Sorted by Created Date</span>
                  </div>

                  {filteredJobs.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
                      No matching job requisitions found. Try adjusting your search query or filters.
                    </div>
                  ) : (
                    filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        isSelected={selectedJob?.id === job.id}
                        onSelect={(j) => setSelectedJob(j)}
                      />
                    ))
                  )}
                </div>

                {/* Right Column Job Details Panel */}
                <div className="lg:col-span-6">
                  <div className="sticky top-24">
                    <JobDetailsPanel
                      job={selectedJob}
                      onDuplicate={handleDuplicateJob}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </PageWrapper>
        </div>
      </div>

      {/* CREATE JOB 5-STEP WIZARD MODAL */}
      <CreateJobWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onJobCreated={handleJobCreated}
      />
    </ProtectedRoute>
  );
}