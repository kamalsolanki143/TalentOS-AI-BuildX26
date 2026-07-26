'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/ui/Navbar';
import { Sidebar } from '@/components/ui/Sidebar';
import { StatCard } from '@/components/ui/StatCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { NotificationDropdown } from '@/components/dashboard/NotificationDropdown';
import { HiringFunnel } from '@/components/dashboard/HiringFunnel';
import { AIInsightsPanel } from '@/components/dashboard/AIInsightsPanel';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  ArrowRight,
  Clock,
  Search,
  Award,
  Send,
  FileText,
  UserCheck,
} from 'lucide-react';
import { fadeUp } from '@/lib/animations';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const recentTimeline = [
    { id: 1, title: 'Rahul Sharma completed AI screening evaluation', role: 'Lead Frontend Engineer', score: '95/100 Fit', time: '10m ago', icon: <Sparkles className="w-4 h-4 text-indigo-600" />, badge: 'Top Fit' },
    { id: 2, title: 'New candidate application received', role: 'UI/UX Product Designer', score: 'Priya Singh', time: '1h ago', icon: <FileText className="w-4 h-4 text-violet-600" />, badge: 'Applied' },
    { id: 3, title: 'Technical Interview scheduled', role: 'Rahul Sharma', score: '2:30 PM Today', time: '2h ago', icon: <Send className="w-4 h-4 text-amber-500" />, badge: 'Scheduled' },
    { id: 4, title: 'Offer Letter generated for Founding Engineer', role: 'BuildX Cohort Role', score: '$120,000 / yr', time: '1d ago', icon: <Award className="w-4 h-4 text-emerald-600" />, badge: 'Offer Sent' },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-ambient-light selection:bg-indigo-100 selection:text-indigo-900">
        {/* LEFT SIDEBAR (Step 1) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* TOP NAVBAR (Step 2) */}
          <Navbar />

          <PageWrapper className="p-4 sm:p-6 lg:p-8 space-y-8">
            <Container size="xl">
              {/* WELCOME BANNER SECTION */}
              <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white shadow-soft-xl border border-indigo-500/20 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm" className="bg-indigo-500/20 text-indigo-200 border-indigo-400/30">
                        BuildX’26 Active Workspace
                      </Badge>
                      <span className="text-xs text-slate-300 font-medium">Founder Mode Active</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      Good morning, Founder 👋
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      You have <strong className="font-semibold text-white">18 shortlisted candidates</strong> across 12 active job requisitions. AI screening reduced your review time by 85% this week.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link href="/dashboard/jobs">
                      <Button variant="primary" size="md" className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-gradient-glow" leftIcon={<PlusCircle className="w-4 h-4" />}>
                        Create Requisition
                      </Button>
                    </Link>
                    <Link href="/dashboard/candidates">
                      <Button variant="secondary" size="md" className="bg-white/10 text-white border-white/20 hover:bg-white/20" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        AI Candidate Shortlists
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* QUICK SEARCH & NOTIFICATION BAR */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-96">
                  <Input
                    placeholder="Search jobs, candidates, or skills..."
                    leftIcon={<Search className="w-4 h-4" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <NotificationDropdown />
                  <Badge variant="success" size="md" dot>AI Co-Pilot 100% Operational</Badge>
                </div>
              </div>

              {/* ANALYTICS OVERVIEW (6 Stat Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-4">
                <StatCard title="Total Jobs" value="12" change="+3 MoM" changeType="positive" icon={<Briefcase className="w-4 h-4" />} />
                <StatCard title="Applications" value="84" change="+24% WoW" changeType="positive" icon={<Users className="w-4 h-4" />} />
                <StatCard title="Shortlisted" value="36" change="Top 43%" changeType="positive" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />} />
                <StatCard title="Interviews" value="14" change="Scheduled" changeType="positive" icon={<Send className="w-4 h-4 text-amber-500" />} />
                <StatCard title="Offer Sent" value="6" change="High Accept" changeType="positive" icon={<Award className="w-4 h-4 text-violet-600" />} />
                <StatCard title="Hired Talent" value="4" change="100% Quality" changeType="positive" icon={<UserCheck className="w-4 h-4 text-indigo-600" />} />
              </div>

              {/* MAIN DASHBOARD GRID (Hiring Funnel, AI Insights, Performance Chart) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                {/* Left Column (Funnel & Chart) */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Hiring Funnel Visualization */}
                  <HiringFunnel />

                  {/* Performance SVG Chart */}
                  <ChartCard
                    title="Candidate Throughput & AI Scoring Distribution"
                    subtitle="Daily applicant influx scored against job requirements"
                    metric="84 Applications Processed"
                    badgeText="Peak Volume: Thu"
                    data={[12, 18, 15, 24, 20, 28, 32]}
                    labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                  />

                  {/* Quick Action Large Buttons */}
                  <QuickActions />
                </div>

                {/* Right Column (AI Insights & Upcoming Interviews) */}
                <div className="lg:col-span-4 space-y-8">
                  {/* AI Insights Panel */}
                  <AIInsightsPanel />

                  {/* Right Sidebar Widget */}
                  <RightSidebar />
                </div>
              </div>

              {/* RECENT ACTIVITY TIMELINE */}
              <div className="pt-6">
                <Card variant="default" padding="lg">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-lg font-bold text-slate-900">Recent Candidate Activity Stream</h3>
                    </div>
                    <Badge variant="neutral" size="sm">Live Feed</Badge>
                  </div>

                  <div className="divide-y divide-slate-100 pt-2">
                    {recentTimeline.map((item) => (
                      <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/60 px-2 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.role} • <span className="font-semibold text-indigo-600">{item.score}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-mono">{item.time}</span>
                          <Badge variant="primary" size="sm">{item.badge}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link href="/dashboard/candidates">
                      <Button variant="text" size="sm">
                        Inspect All Candidate Profiles →
                      </Button>
                    </Link>
                    <Link href="/dashboard/jobs">
                      <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
                        Create Requisition
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </Container>
          </PageWrapper>
        </div>
      </div>
    </ProtectedRoute>
  );
}