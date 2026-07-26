'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/ui/Navbar';
import { Sidebar } from '@/components/ui/Sidebar';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/useToast';
import { User, Building2, Briefcase, Mail, Phone, MapPin, Linkedin, Save, X, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || 'Founder Workspace');
  const [companyName, setCompanyName] = useState(user?.companyName || 'HyperScale AI');
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || 'Founder & CEO');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [bio, setBio] = useState(user?.bio || 'Building early-stage founding teams 10x faster using explainable AI.');
  const [linkedInUrl, setLinkedInUrl] = useState(user?.linkedInUrl || 'https://linkedin.com/in/founder-demo');
  const [location, setLocation] = useState(user?.location || 'San Francisco, CA');
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    updateProfile({
      name,
      companyName,
      jobTitle,
      phone,
      bio,
      linkedInUrl,
      location,
    });

    setTimeout(() => {
      setSaving(false);
      toast({
        title: 'Profile Updated Successfully',
        description: 'Your founder profile and workspace details have been saved to local session storage.',
        variant: 'success',
      });
    }, 400);
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
            <Container size="lg">
              {/* Header */}
              <div className="pb-6 border-b border-slate-200/80">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="primary" size="sm" dot>Workspace Account</Badge>
                  <span className="text-xs font-medium text-slate-400">Profile &amp; Identity</span>
                </div>
                <h1 className="text-page-title text-slate-900 font-bold tracking-tight">
                  Edit Founder Profile
                </h1>
                <p className="text-small-custom text-slate-500 mt-1">
                  Manage your personal workspace details, role information, and contact credentials.
                </p>
              </div>

              {/* Profile Card Header */}
              <Card variant="gradient" padding="lg" className="mt-6 mb-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar name={name} size="xl" status="online" />
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <h2 className="text-xl font-bold text-slate-900">{name}</h2>
                      <Badge variant="success" size="sm">Active Founder</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{jobTitle} at <span className="font-semibold text-slate-700">{companyName}</span></p>
                    <p className="text-xs text-indigo-600 font-mono flex items-center justify-center sm:justify-start gap-1 pt-1">
                      <MapPin className="w-3.5 h-3.5" /> {location}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-6">
                <Card variant="default" padding="lg" className="space-y-6">
                  <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Personal &amp; Company Credentials</h3>
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      leftIcon={<User className="w-4 h-4" />}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />

                    <Input
                      label="Company Name"
                      leftIcon={<Building2 className="w-4 h-4" />}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />

                    <Input
                      label="Job Title / Role"
                      leftIcon={<Briefcase className="w-4 h-4" />}
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />

                    <Input
                      label="Email Address (Read-only in Demo)"
                      type="email"
                      leftIcon={<Mail className="w-4 h-4" />}
                      value={user?.email || 'demo@talentos.ai'}
                      disabled
                      helperText="Contact system admin to update email."
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      leftIcon={<Phone className="w-4 h-4" />}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />

                    <Input
                      label="Location"
                      leftIcon={<MapPin className="w-4 h-4" />}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <Input
                    label="LinkedIn Profile URL"
                    leftIcon={<Linkedin className="w-4 h-4" />}
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                  />

                  <Textarea
                    label="Short Bio"
                    placeholder="Tell candidates and team members about your startup mission..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Card>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => router.push('/dashboard')}
                    leftIcon={<X className="w-4 h-4" />}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={saving}
                    leftIcon={<Save className="w-4 h-4" />}
                    className="shadow-gradient-glow"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Container>
          </PageWrapper>
        </div>
      </div>
    </ProtectedRoute>
  );
}
