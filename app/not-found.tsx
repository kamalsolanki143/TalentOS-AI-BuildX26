'use client';

import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ambient-light flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16">
        <Container size="md">
          <Card variant="gradient" padding="lg" className="text-center p-10 md:p-14 space-y-6 shadow-soft-xl border-indigo-100">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                Error 404 — Page Not Found
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Lost in the Hiring Space?
              </h1>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                The requisition page or resource you are looking for has been moved or doesn&apos;t exist in TalentOS.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <Link href="/">
                <Button variant="secondary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Home
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />} className="shadow-gradient-glow">
                  Founder Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
