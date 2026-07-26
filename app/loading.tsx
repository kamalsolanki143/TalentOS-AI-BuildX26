import React from 'react';
import { Loading } from '@/components/ui/Loading';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loading size="lg" label="Loading TalentOS Workspace..." />
    </div>
  );
}
