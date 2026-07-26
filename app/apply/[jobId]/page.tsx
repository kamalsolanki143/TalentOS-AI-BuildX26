'use client';

import React from 'react';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import CandidateForm from '@/components/CandidateForm';
import { Briefcase, MapPin, DollarSign, Clock, Sparkles } from 'lucide-react';

export default function ApplyPage() {
  return (
    <PageWrapper>
      <Navbar />

      <main className="py-12 md:py-16">
        <Container size="md">
          {/* Job Overview Header Card */}
          <Card variant="gradient" padding="lg" className="mb-8 shadow-soft-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary" size="sm" dot>Active Hiring Requisition</Badge>
                  <span className="text-xs text-slate-400 font-medium">Ref #JOB-2026</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Lead Frontend Developer
                </h1>
                <p className="text-sm font-semibold text-indigo-600 mt-1">TalentOS AI Core Team</p>
              </div>

              <Badge variant="success" size="md">
                Fast-Track AI Review
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Remote / Worldwide</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>Full-Time / Founding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span>Competitive + Equity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Immediate Joiner</span>
              </div>
            </div>
          </Card>

          {/* Application Form */}
          <CandidateForm />
        </Container>
      </main>

      <Footer />
    </PageWrapper>
  );
}