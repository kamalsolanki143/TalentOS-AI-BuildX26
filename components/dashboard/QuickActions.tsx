'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Users, ShieldCheck, Share2, Sparkles } from 'lucide-react';

export const QuickActions: React.FC = () => {
  return (
    <Card variant="default" padding="lg" className="shadow-soft-md">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/dashboard/jobs">
          <Button variant="primary" size="md" className="w-full justify-start gap-2.5 shadow-gradient-glow py-3" leftIcon={<PlusCircle className="w-4 h-4" />}>
            Create Job Requisition
          </Button>
        </Link>

        <Link href="/dashboard/candidates">
          <Button variant="secondary" size="md" className="w-full justify-start gap-2.5 py-3" leftIcon={<Users className="w-4 h-4 text-indigo-600" />}>
            View AI Shortlists
          </Button>
        </Link>

        <Link href="/ai-transparency">
          <Button variant="secondary" size="md" className="w-full justify-start gap-2.5 py-3" leftIcon={<ShieldCheck className="w-4 h-4 text-violet-600" />}>
            AI Transparency Audit
          </Button>
        </Link>

        <Link href="/apply/job-1">
          <Button variant="ghost" size="md" className="w-full justify-start gap-2.5 py-3 text-slate-700 hover:bg-slate-100" leftIcon={<Share2 className="w-4 h-4 text-blue-600" />}>
            Preview Job Portal
          </Button>
        </Link>
      </div>
    </Card>
  );
};
