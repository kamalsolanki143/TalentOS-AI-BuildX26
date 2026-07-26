'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { Briefcase, Building, Code, DollarSign, HelpCircle, PlusCircle } from 'lucide-react';

export default function JobForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('TalentOS AI');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');

  const experienceOptions = [
    { value: 'Fresher', label: 'Fresher / Graduate' },
    { value: '0-1 Years', label: '0-1 Years Experience' },
    { value: '1-3 Years', label: '1-3 Years Experience' },
    { value: '3+ Years', label: '3+ Years Senior Level' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: 'Job Requisition Published!',
        description: `Successfully generated AI screening criteria for ${title || 'New Job Role'}. Candidates can now apply.`,
        variant: 'success',
      });
      router.push('/dashboard/candidates');
    }, 500);
  };

  return (
    <Card variant="default" padding="lg" className="shadow-soft-xl max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create New Job Requisition</h2>
          <p className="text-xs text-slate-500">Configure AI co-pilot evaluation criteria for your opening</p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Job Title"
            placeholder="e.g. Lead Frontend Engineer"
            leftIcon={<Briefcase className="w-4 h-4" />}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            label="Company Name"
            placeholder="e.g. TalentOS"
            leftIcon={<Building className="w-4 h-4" />}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <Textarea
          label="Job Description"
          rows={4}
          placeholder="Outline key responsibilities, tech stack, and role expectations..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Input
          label="Required Skills"
          placeholder="e.g. React, Next.js, TypeScript, Tailwind CSS"
          leftIcon={<Code className="w-4 h-4" />}
          helperText="Separate skills with commas for AI semantic matching"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Experience Level"
            options={experienceOptions}
          />
          <Input
            label="Salary / Stipend"
            placeholder="e.g. $100,000 - $140,000 / year"
            leftIcon={<DollarSign className="w-4 h-4" />}
          />
        </div>

        <Textarea
          label="Screening Questions"
          rows={3}
          placeholder="e.g. What is your experience with Next.js App Router and state management?"
          leftIcon={<HelpCircle className="w-4 h-4" />}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={submitting}
            className="w-full shadow-gradient-glow"
            rightIcon={<PlusCircle className="w-4 h-4" />}
          >
            Create Job Requisition
          </Button>
        </div>
      </form>
    </Card>
  );
}