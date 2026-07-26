'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/ui/Navbar';
import { Sidebar } from '@/components/ui/Sidebar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/useToast';
import {
  User,
  Sun,
  Bell,
  Lock,
  Users,
  CreditCard,
  Info,
  ShieldCheck,
  CheckCircle2,
  Save,
  Sparkles,
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'notifications' | 'security' | 'team' | 'billing' | 'about'>('profile');

  // Dummy security fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingSec, setSavingSec] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSec(true);

    setTimeout(() => {
      setSavingSec(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: 'Password Updated (Demo)',
        description: 'Your workspace password change request has been recorded for the demo session.',
        variant: 'success',
      });
    }, 400);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Sun className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing (Demo)', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

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
              {/* Header */}
              <div className="pb-6 border-b border-slate-200/80">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="primary" size="sm" dot>Workspace Settings</Badge>
                  <span className="text-xs font-medium text-slate-400">Configuration</span>
                </div>
                <h1 className="text-page-title text-slate-900 font-bold tracking-tight">
                  Account &amp; Workspace Settings
                </h1>
                <p className="text-small-custom text-slate-500 mt-1">
                  Configure workspace parameters, notification thresholds, security policies, and team permissions.
                </p>
              </div>

              {/* Tabs Bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 pt-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-white text-indigo-600 shadow-soft-sm border border-slate-200/80'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="pt-6">
                {activeTab === 'profile' && (
                  <Card variant="default" padding="lg" className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Profile Details</h3>
                    <p className="text-xs text-slate-500">Quick view of active workspace profile settings.</p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-700">
                      <p><strong>Name:</strong> {user?.name || 'Founder Workspace'}</p>
                      <p><strong>Company:</strong> {user?.companyName || 'HyperScale AI'}</p>
                      <p><strong>Email:</strong> {user?.email || 'demo@talentos.ai'}</p>
                      <p><strong>Role:</strong> {user?.role || 'Founder'}</p>
                    </div>
                    <Link href="/dashboard/profile">
                      <Button variant="primary" size="sm" className="mt-2">
                        Edit Full Profile →
                      </Button>
                    </Link>
                  </Card>
                )}

                {activeTab === 'appearance' && (
                  <Card variant="default" padding="lg" className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Appearance &amp; Visual Theme</h3>
                    <p className="text-xs text-slate-500">TalentOS features a curated modern light design system optimized for readability.</p>
                    <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs text-indigo-900 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-indigo-700">
                        <Sun className="w-4 h-4 text-amber-500" />
                        <span>SaaS Light Theme Enforced</span>
                      </div>
                      <p className="text-slate-600">High-contrast slate-900 typography on soft ambient background (#F8FAFC).</p>
                    </div>
                  </Card>
                )}

                {activeTab === 'notifications' && (
                  <Card variant="default" padding="lg" className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Notification Preferences</h3>
                    <p className="text-xs text-slate-500">Configure alert channels for new candidate applications and score reports.</p>
                    <div className="space-y-3 pt-2">
                      <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs cursor-pointer">
                        <span className="font-semibold text-slate-900">Email alerts for candidate scorecards {'>'}85</span>
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs cursor-pointer">
                        <span className="font-semibold text-slate-900">WhatsApp direct candidate interview reminders</span>
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs cursor-pointer">
                        <span className="font-semibold text-slate-900">Weekly applicant throughput analytics digest</span>
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      </label>
                    </div>
                  </Card>
                )}

                {activeTab === 'security' && (
                  <Card variant="default" padding="lg" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Security &amp; Password</h3>
                      <p className="text-xs text-slate-500">Update your workspace password for demo evaluation.</p>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                      <Input
                        label="Current Password"
                        type="password"
                        placeholder="••••••••••••"
                        leftIcon={<Lock className="w-4 h-4" />}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />

                      <Input
                        label="New Password"
                        type="password"
                        placeholder="••••••••••••"
                        leftIcon={<Lock className="w-4 h-4" />}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />

                      <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="••••••••••••"
                        leftIcon={<Lock className="w-4 h-4" />}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />

                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={savingSec}
                        leftIcon={<Save className="w-4 h-4" />}
                      >
                        Update Demo Password
                      </Button>
                    </form>
                  </Card>
                )}

                {activeTab === 'team' && (
                  <Card variant="default" padding="lg" className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Team Members &amp; Co-Founders</h3>
                        <p className="text-xs text-slate-500">Collaborate on candidate reviews and interview scorecards.</p>
                      </div>
                      <Button variant="primary" size="sm" leftIcon={<Users className="w-4 h-4" />}>
                        + Invite Co-Founder
                      </Button>
                    </div>

                    <div className="divide-y divide-slate-100">
                      <div className="py-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{user?.name || 'Founder Workspace'} (You)</p>
                          <p className="text-[11px] text-slate-500">{user?.email || 'demo@talentos.ai'}</p>
                        </div>
                        <Badge variant="primary" size="sm">Workspace Owner</Badge>
                      </div>
                    </div>
                  </Card>
                )}

                {activeTab === 'billing' && (
                  <Card variant="default" padding="lg" className="space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Billing &amp; Subscription Plan</h3>
                        <p className="text-xs text-slate-500">BuildX’26 Hackathon Special Edition</p>
                      </div>
                      <Badge variant="success" size="md" dot>BuildX Pro Active</Badge>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Active Tier</span>
                      <h4 className="text-2xl font-extrabold">BuildX’26 Founder Plan — $0 / Free</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Enjoy full access to explainable AI scoring, 0–100 candidate ranking, and unlimited requisition postings during the BuildX release.
                      </p>
                    </div>
                  </Card>
                )}

                {activeTab === 'about' && (
                  <Card variant="default" padding="lg" className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-lg font-bold text-slate-900">About TalentOS</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      TalentOS is an AI-powered Hiring Co-Pilot designed for early-stage startup founders. It automates candidate screening, semantic fit scoring, and recruitment workflows with transparent explainable AI.
                    </p>
                    <div className="pt-2 text-xs font-mono text-slate-500 space-y-1 border-t border-slate-100">
                      <p>Platform Version: v2.6.0-buildx</p>
                      <p>Engine: Google Gemini Flash XAI</p>
                      <p>Environment: Demo Sandbox Mode</p>
                    </div>
                  </Card>
                )}
              </div>
            </Container>
          </PageWrapper>
        </div>
      </div>
    </ProtectedRoute>
  );
}
