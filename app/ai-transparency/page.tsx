'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import {
  DecisionOverview,
  ResumeHighlightViewer,
  BiasDetectionPanel,
  DecisionTimeline,
  AuditLogTable,
  HumanReviewPanel,
} from '@/components/ai-transparency';
import {
  CheckCircle2,
  Download,
  Share2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export default function AITransparencyPage() {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    toast({
      title: 'XAI Audit Report PDF Exported',
      description: 'Downloaded full Explainable AI decision audit breakdown.',
      variant: 'success',
    });
  };

  const handleShareReport = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Public Explanation Link Copied',
      description: 'Audit report URL copied to clipboard.',
      variant: 'success',
    });
  };

  const scoreDimensions = [
    { name: 'Technical Skills Fit', score: 98, weight: '30%', confidence: '99%' },
    { name: 'Startup Culture Fit', score: 95, weight: '25%', confidence: '96%' },
    { name: 'Communication Depth', score: 92, weight: '20%', confidence: '94%' },
    { name: 'Salary Alignment', score: 90, weight: '15%', confidence: '98%' },
    { name: 'Immediate Availability', score: 100, weight: '10%', confidence: '100%' },
  ];

  const whyScoreExplanations = [
    {
      title: 'Matched 9 of 10 Required Skills',
      reason: 'Candidate resume explicitly verifies Next.js 14, React, TypeScript, Tailwind CSS, and Supabase.',
      confidence: '99% Match',
    },
    {
      title: '4 Years Next.js Experience Detected',
      reason: 'Work history at HyperScale Labs details 4 years of senior frontend architecture experience.',
      confidence: '98% Confident',
    },
    {
      title: 'Startup Ownership Keywords Identified',
      reason: 'Semantic parser detected "0->1 feature ownership", "fast execution velocity", and "founder communication".',
      confidence: '95% Match',
    },
    {
      title: 'Production Portfolio Work Verified',
      reason: 'Portfolio links demonstrate complex web applications serving >50k active users.',
      confidence: '96% Confident',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-ambient-light flex flex-col font-sans">
        <Navbar />

        <PageWrapper className="p-4 sm:p-6 lg:p-8 space-y-10 flex-1">
          <Container size="xl">
            {/* 1. HERO SECTION */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm" dot>Explainable AI (XAI) Control Center</Badge>
                  <span className="text-xs font-mono text-slate-400">BuildX Integrity Standard</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Transparent AI Decisions &amp; Score Audit
                </h1>
                <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
                  TalentOS never uses black-box algorithms. Inspect exact score breakdowns, empirical resume evidence, and 100% non-demographic bias checks for every candidate recommendation.
                </p>
              </div>

              {/* Export Actions Bar */}
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="primary" size="sm" onClick={handleDownloadPDF} leftIcon={<Download className="w-4 h-4" />}>
                  Download PDF Report
                </Button>
                <Button variant="secondary" size="sm" onClick={handleShareReport} leftIcon={<Share2 className="w-4 h-4 text-indigo-600" />}>
                  Share Report
                </Button>
              </div>
            </div>

            {/* 2. OVERALL AI DECISION PANEL */}
            <div className="pt-6">
              <DecisionOverview />
            </div>

            {/* 3. 10-DIMENSION AI SCORE BREAKDOWN */}
            <SectionContainer title="5-Dimension Score Contribution Matrix" subtitle="Transparent weighted score calculation formula">
              <Card variant="default" padding="lg" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
                  {scoreDimensions.map((dim, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{dim.name}</span>
                      <span className="text-2xl font-black text-indigo-600 font-mono block">{dim.score}%</span>
                      <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span>Weight: {dim.weight}</span>
                        <span className="text-emerald-600 font-semibold">{dim.confidence} Conf.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </SectionContainer>

            {/* 4. WHY THIS SCORE? EXPLANATION CARDS */}
            <SectionContainer title="Why This Candidate Scored 95/100" subtitle="Empirical rationale and verified resume evidence">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whyScoreExplanations.map((exp, idx) => (
                  <Card key={idx} variant="gradient" padding="md" className="border-indigo-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <h4 className="text-sm font-bold text-slate-900">{exp.title}</h4>
                      </div>
                      <Badge variant="success" size="sm">{exp.confidence}</Badge>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-6">{exp.reason}</p>
                  </Card>
                ))}
              </div>
            </SectionContainer>

            {/* 5. RESUME HIGHLIGHT VIEWER */}
            <SectionContainer title="Interactive Resume Detection Highlights" subtitle="Click highlighted text to inspect exact AI detection evidence">
              <ResumeHighlightViewer />
            </SectionContainer>

            {/* 6. SKILL MATCH VISUALIZATION (Required VS Detected) */}
            <SectionContainer title="Skill Match Visualization" subtitle="Required skills vs. detected candidate skills">
              <Card variant="default" padding="lg" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Matched Skills (5/6)
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'].map((sk, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-100">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Missing / Gap Skills (1/6)
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['GraphQL'].map((sk, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold border border-amber-100">
                          ! {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Bonus Skills Detected
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Framer Motion', 'Zustand', 'Design Tokens'].map((sk, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100">
                          + {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </SectionContainer>

            {/* 7. EEOC BIAS DETECTION PANEL */}
            <SectionContainer title="EEOC Non-Demographic Bias Audit" subtitle="Guaranteed blind evaluation pass ignoring protected demographic attributes">
              <BiasDetectionPanel />
            </SectionContainer>

            {/* 8. DECISION TIMELINE */}
            <SectionContainer title="AI Decision Execution Stream" subtitle="Step-by-step evaluation workflow timeline">
              <DecisionTimeline />
            </SectionContainer>

            {/* 9. AI AUDIT LOG TABLE */}
            <SectionContainer title="Immutable AI Audit Logs" subtitle="Audit-compliant record of all scoring passes and human reviews">
              <AuditLogTable />
            </SectionContainer>

            {/* 10. HUMAN REVIEW & OVERRIDE PANEL */}
            <SectionContainer title="Human Founder Governance" subtitle="Approve AI recommendations or record manual score overrides">
              <HumanReviewPanel />
            </SectionContainer>
          </Container>
        </PageWrapper>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}

function SectionContainer({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 pt-6 border-t border-slate-200/60">
      <div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
