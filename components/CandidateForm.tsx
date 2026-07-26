'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { User, Mail, Phone, Linkedin, Globe, FileText, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CandidateForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({
        title: 'Application Received!',
        description: `Thank you ${fullName || 'Applicant'}. TalentOS AI co-pilot is currently evaluating your profile.`,
        variant: 'success',
      });
    }, 600);
  };

  if (submitted) {
    return (
      <Card variant="gradient" padding="lg" className="shadow-soft-xl max-w-2xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Application Submitted Successfully</h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          Your profile has been parsed and queued for non-demographic AI score evaluation. You will receive updates via email and WhatsApp once the founder reviews your score.
        </p>
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
            Submit Another Application
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg" className="shadow-soft-xl max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Apply for this Job</h2>
          <p className="text-xs text-slate-500">Submit your application to TalentOS for AI co-pilot evaluation</p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          placeholder="e.g. Alex Johnson"
          leftIcon={<User className="w-4 h-4" />}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="alex@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            leftIcon={<Phone className="w-4 h-4" />}
          />
          <Input
            label="WhatsApp Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="LinkedIn Profile"
            type="url"
            placeholder="https://linkedin.com/in/username"
            leftIcon={<Linkedin className="w-4 h-4" />}
          />
          <Input
            label="Portfolio / Website"
            type="url"
            placeholder="https://yourportfolio.com"
            leftIcon={<Globe className="w-4 h-4" />}
          />
        </div>

        <Input
          label="Resume Link"
          type="url"
          placeholder="Google Drive, Dropbox or PDF URL"
          leftIcon={<FileText className="w-4 h-4" />}
          helperText="Provide a public link to your resume for AI parsing"
          required
        />

        <Textarea
          label="Why should we hire you?"
          rows={4}
          placeholder="Tell us about your background, technical achievements, and why you are a great fit..."
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={submitting}
            className="w-full shadow-gradient-glow"
            rightIcon={<Send className="w-4 h-4" />}
          >
            Submit Application
          </Button>
        </div>
      </form>
    </Card>
  );
}