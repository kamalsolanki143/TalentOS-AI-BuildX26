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
import { useToast } from '@/hooks/useToast';
import { CandidateListCard, CandidateItem } from '@/components/candidates/CandidateListCard';
import { CandidateProfilePanel } from '@/components/candidates/CandidateProfilePanel';
import { AICopilotPanel } from '@/components/candidates/AICopilotPanel';
import { PipelineBoard } from '@/components/candidates/PipelineBoard';
import { CandidateCompareTable } from '@/components/candidates/CandidateCompareTable';
import {
  Users,
  Search,
  Upload,
  LayoutGrid,
  Columns,
  GitCompare,
  Sparkles,
  Calendar,
  Award,
  UserCheck,
} from 'lucide-react';

const initialCandidates: CandidateItem[] = [
  {
    id: 'cand-1',
    name: 'Rahul Sharma',
    role: 'Lead Frontend Engineer',
    company: 'HyperScale Labs',
    experienceYears: 4,
    location: 'San Francisco, CA / Remote',
    email: 'rahul.sharma@example.com',
    phone: '+1 (555) 345-6789',
    linkedInUrl: 'https://linkedin.com/in/rahul-sharma-demo',
    aiScore: 95,
    status: 'AI Ranked',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    availability: 'Immediate (1 Week)',
    salaryExpectation: '$135,000 / yr',
    summary: 'Senior Frontend Engineer with 4 years of experience architecting high-performance React/Next.js applications. Strong track record in 0->1 startup environments, component design systems, and state management optimization.',
    scoreBreakdown: {
      skillFit: 98,
      startupFit: 95,
      communication: 92,
      salaryFit: 90,
      availability: 100,
    },
    pros: [
      'Direct Next.js 14 App Router production experience',
      'Exemplary component architecture & design system mastery',
      'Strong founder communication & ownership mindset',
    ],
    cons: [
      'Higher salary expectation ($135k vs $125k budget median)',
    ],
    missingSkills: ['GraphQL (Minor)'],
    suggestedQuestions: [
      'How do you manage complex server-side caching in Next.js App Router?',
      'Describe a time you refactored a slow React rendering bottleneck.',
    ],
    riskIndicator: 'Low',
    resumeUrl: '/resumes/rahul-sharma.pdf',
    education: 'B.S. Computer Science, Stanford University',
    lastActivity: '2 hours ago',
  },
  {
    id: 'cand-2',
    name: 'Priya Singh',
    role: 'UI/UX Product Designer',
    company: 'CloudPulse Tech',
    experienceYears: 5,
    location: 'New York, NY / Remote',
    email: 'priya.singh@example.com',
    phone: '+1 (555) 456-7890',
    linkedInUrl: 'https://linkedin.com/in/priya-singh-demo',
    aiScore: 91,
    status: 'Interview',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Micro-Interactions', 'User Research'],
    availability: '2 Weeks Notice',
    salaryExpectation: '$120,000 / yr',
    summary: 'Senior UI/UX Product Designer specialized in building sleek, high-end SaaS product interfaces inspired by Linear, Stripe, and Vercel.',
    scoreBreakdown: {
      skillFit: 94,
      startupFit: 90,
      communication: 95,
      salaryFit: 92,
      availability: 80,
    },
    pros: [
      'Stunning SaaS portfolio with glassmorphism & micro-interactions',
      'Established design system token conventions',
    ],
    cons: [
      'Requires 2 weeks notice before joining',
    ],
    missingSkills: ['Prototyping in Framer (Minor)'],
    suggestedQuestions: [
      'Walk us through your process for converting complex user flows into clean interfaces.',
    ],
    riskIndicator: 'Low',
    resumeUrl: '/resumes/priya-singh.pdf',
    education: 'B.Des Interaction Design, RISD',
    lastActivity: '1 day ago',
  },
  {
    id: 'cand-3',
    name: 'Alex Rivera',
    role: 'Backend Systems Engineer',
    company: 'DevFlow AI',
    experienceYears: 3,
    location: 'Austin, TX / Remote',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 567-8901',
    linkedInUrl: 'https://linkedin.com/in/alex-rivera-demo',
    aiScore: 84,
    status: 'Screening',
    skills: ['Node.js', 'PostgreSQL', 'Supabase', 'Python', 'REST APIs', 'Docker'],
    availability: 'Immediate',
    salaryExpectation: '$115,000 / yr',
    summary: 'Backend Engineer with 3 years of experience building resilient REST APIs, PostgreSQL schemas, and Supabase backend services.',
    scoreBreakdown: {
      skillFit: 85,
      startupFit: 82,
      communication: 80,
      salaryFit: 95,
      availability: 100,
    },
    pros: [
      'Strong database query optimization skills',
      'Immediate availability for founding backend role',
    ],
    cons: [
      'Less experience with vector embeddings / LLM orchestration',
    ],
    missingSkills: ['LangChain / LlamaIndex'],
    suggestedQuestions: [
      'How do you design database indexes for sub-100ms candidate query filters?',
    ],
    riskIndicator: 'Medium',
    resumeUrl: '/resumes/alex-rivera.pdf',
    education: 'B.S. Software Engineering, UT Austin',
    lastActivity: '3 days ago',
  },
  {
    id: 'cand-4',
    name: 'Marcus Vance',
    role: 'Growth Marketing Lead',
    company: 'Antler Cohort',
    experienceYears: 4,
    location: 'London, UK / Remote',
    email: 'marcus.vance@example.com',
    phone: '+44 20 7946 0912',
    linkedInUrl: 'https://linkedin.com/in/marcus-vance-demo',
    aiScore: 79,
    status: 'Applied',
    skills: ['Growth Marketing', 'SEO', 'Content Strategy', 'Copywriting', 'Analytics'],
    availability: '1 Month Notice',
    salaryExpectation: '$90,000 / yr',
    summary: 'Growth Marketer focused on early-stage B2B developer SaaS acquisition channels and founder community marketing.',
    scoreBreakdown: {
      skillFit: 78,
      startupFit: 80,
      communication: 88,
      salaryFit: 85,
      availability: 60,
    },
    pros: [
      'Proven founder community acquisition strategies',
    ],
    cons: [
      '1 month notice required',
    ],
    missingSkills: ['Paid Ads Automation'],
    suggestedQuestions: [
      'What organic channels drove your highest B2B conversion rate in past roles?',
    ],
    riskIndicator: 'Medium',
    resumeUrl: '/resumes/marcus-vance.pdf',
    education: 'M.S. Marketing, Imperial College London',
    lastActivity: '5 days ago',
  },
];

export default function CandidatesPage() {
  const { toast } = useToast();
  const [candidatesList, setCandidatesList] = useState<CandidateItem[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateItem | null>(initialCandidates[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState('All');

  // View Mode: 'split' | 'pipeline' | 'compare'
  const [viewMode, setViewMode] = useState<'split' | 'pipeline' | 'compare'>('split');

  // Metrics
  const totalCandidates = candidatesList.length;
  const aiRankedCount = candidatesList.filter((c) => c.status === 'AI Ranked').length;
  const interviewCount = candidatesList.filter((c) => c.status === 'Interview').length;
  const offerCount = candidatesList.filter((c) => c.status === 'Offer').length;
  const hiredCount = candidatesList.filter((c) => c.status === 'Hired').length;

  // Filter candidates
  const filteredCandidates = candidatesList.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesScore = minScore === 'All' ||
      (minScore === '90+' && c.aiScore >= 90) ||
      (minScore === '80+' && c.aiScore >= 80);

    return matchesSearch && matchesScore;
  });

  const handleStatusChange = (candidateId: string, newStatus: CandidateItem['status']) => {
    setCandidatesList((prev) =>
      prev.map((cand) => (cand.id === candidateId ? { ...cand, status: newStatus } : cand))
    );
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }
  };

  const handleUploadResume = () => {
    toast({
      title: 'Resume Upload Simulator',
      description: 'Drag & drop PDF resumes to run automated 5-dimension AI score parsing.',
      variant: 'info',
    });
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
              {/* TOP HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="primary" size="sm" dot>AI Candidate Evaluation OS</Badge>
                    <span className="text-xs font-medium text-slate-400">BuildX Pipeline</span>
                  </div>
                  <h1 className="text-page-title text-slate-900 font-bold tracking-tight">
                    Candidate Intelligence Hub
                  </h1>
                  <p className="text-small-custom text-slate-500 mt-1">
                    Inspect 0–100 AI match scores, non-demographic scorecards, and candidate pipeline throughput.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleUploadResume}
                    leftIcon={<Upload className="w-4 h-4 text-indigo-600" />}
                  >
                    Upload Resumes
                  </Button>
                </div>
              </div>

              {/* STAT CARDS ROW */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                <StatCard title="Total Applicants" value={totalCandidates.toString()} change="All Requisitions" changeType="positive" icon={<Users className="w-4 h-4" />} />
                <StatCard title="AI Ranked" value={aiRankedCount.toString()} change="Top Match >85" changeType="positive" icon={<Sparkles className="w-4 h-4 text-emerald-600" />} />
                <StatCard title="Interviewing" value={interviewCount.toString()} change="Active Schedules" changeType="positive" icon={<Calendar className="w-4 h-4 text-indigo-600" />} />
                <StatCard title="Offers Sent" value={offerCount.toString()} change="Pending Acceptance" changeType="positive" icon={<Award className="w-4 h-4 text-violet-600" />} />
                <StatCard title="Hired Talent" value={hiredCount.toString()} change="Joined Team" changeType="positive" icon={<UserCheck className="w-4 h-4 text-emerald-600" />} />
              </div>

              {/* ACTION TOOLBAR & VIEW TOGGLE */}
              <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm">
                <div className="w-full md:w-80">
                  <Input
                    placeholder="Search candidate name, role, or skills..."
                    leftIcon={<Search className="w-4 h-4" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="w-32">
                    <Select
                      value={minScore}
                      onChange={(e) => setMinScore(e.target.value)}
                      options={[
                        { value: 'All', label: 'All Scores' },
                        { value: '90+', label: '90+ AI Fit' },
                        { value: '80+', label: '80+ AI Fit' },
                      ]}
                    />
                  </div>

                  {/* View Mode Toggle Buttons */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setViewMode('split')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        viewMode === 'split' ? 'bg-white text-indigo-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>3-Column</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode('pipeline')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        viewMode === 'pipeline' ? 'bg-white text-indigo-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span>Pipeline</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode('compare')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        viewMode === 'compare' ? 'bg-white text-indigo-600 shadow-soft-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>Compare</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT WORKSPACE BASED ON VIEW MODE */}
              <div className="pt-4">
                {/* 1. THREE-COLUMN SPLIT VIEW MODE */}
                {viewMode === 'split' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Panel (30%): Candidate List Cards */}
                    <div className="lg:col-span-3 space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Applicants ({filteredCandidates.length})
                        </span>
                      </div>

                      {filteredCandidates.map((cand) => (
                        <CandidateListCard
                          key={cand.id}
                          candidate={cand}
                          isSelected={selectedCandidate?.id === cand.id}
                          onSelect={(c) => setSelectedCandidate(c)}
                        />
                      ))}
                    </div>

                    {/* Center Panel (45%): Candidate Detailed Profile & Resume */}
                    <div className="lg:col-span-6">
                      <CandidateProfilePanel
                        candidate={selectedCandidate}
                        onStatusChange={handleStatusChange}
                      />
                    </div>

                    {/* Right Panel (25%): AI Co-Pilot Intelligence Panel */}
                    <div className="lg:col-span-3">
                      <div className="sticky top-24">
                        <AICopilotPanel candidate={selectedCandidate} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. KANBAN PIPELINE BOARD VIEW MODE */}
                {viewMode === 'pipeline' && (
                  <PipelineBoard
                    candidates={candidatesList}
                    onSelectCandidate={(c) => {
                      setSelectedCandidate(c);
                      setViewMode('split');
                    }}
                    onMoveStage={handleStatusChange}
                  />
                )}

                {/* 3. SIDE-BY-SIDE COMPARISON VIEW MODE */}
                {viewMode === 'compare' && (
                  <CandidateCompareTable candidates={filteredCandidates} />
                )}
              </div>
            </Container>
          </PageWrapper>
        </div>
      </div>
    </ProtectedRoute>
  );
}
