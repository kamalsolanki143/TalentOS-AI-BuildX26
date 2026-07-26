'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { GlassCard } from '@/components/ui/GlassCard';
import { useToast } from '@/hooks/useToast';
import type { JobItem } from './JobCard';
import {
  Briefcase,
  Building,
  Code,
  DollarSign,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface CreateJobWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (newJob: JobItem) => void;
}

export const CreateJobWizard: React.FC<CreateJobWizardProps> = ({ isOpen, onClose, onJobCreated }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  // Step 1: Basic Info
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [employmentType, setEmploymentType] = useState('Full-Time');
  const [location, setLocation] = useState('Remote (Worldwide)');
  const [salaryRange, setSalaryRange] = useState('$100,000 - $140,000 / yr');

  // Step 2: Description & Responsibilities
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState(
    'Architect and implement high-performance web components using Next.js App Router.\nCollaborate closely with founder and product designers on 0->1 features.'
  );

  // Step 3: Skills & Experience
  const [skills, setSkills] = useState('React, Next.js, TypeScript, Tailwind CSS, Supabase');
  const [experienceLevel, setExperienceLevel] = useState('3+ Years Senior Level');
  const [requirements, setRequirements] = useState(
    '3+ years production experience with React and TypeScript.\nProven ability to thrive in scrappy early-stage startup environments.'
  );

  // Step 4: AI Optimization States
  const [aiOptimizing, setAiOptimizing] = useState(false);
  const [aiOptimized, setAiOptimized] = useState(false);

  const handleAiOptimize = () => {
    setAiOptimizing(true);
    setTimeout(() => {
      setAiOptimizing(false);
      setAiOptimized(true);
      toast({
        title: 'AI Optimization Complete!',
        description: 'Enhanced job description clarity, verified non-demographic bias, and verified 98% readability score.',
        variant: 'success',
      });
    }, 600);
  };

  const handlePublish = () => {
    const newJob: JobItem = {
      id: `job-${Date.now()}`,
      title: title || 'Founding Engineer',
      department,
      employmentType,
      location,
      salaryRange,
      applicantsCount: 0,
      aiMatchAvg: 95,
      createdDate: 'Just now',
      status: 'Active',
      description: description || 'Building 0->1 AI hiring co-pilot features for early-stage founders.',
      requirements: requirements.split('\n').filter(Boolean),
      responsibilities: responsibilities.split('\n').filter(Boolean),
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      hiringTimeline: '12 Days',
      aiDifficulty: 'Medium',
      aiTips: 'High candidate pool match for Next.js + TypeScript skills in North America and India.',
    };

    onJobCreated(newJob);
    toast({
      title: 'Job Requisition Published Live!',
      description: `${newJob.title} is now active on your public application portal.`,
      variant: 'success',
    });
    setStep(1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Job Requisition (5-Step Wizard)"
      size="xl"
    >
      <div className="space-y-6 select-none">
        {/* Wizard Step Progress Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-semibold text-slate-500">
          {[
            { s: 1, label: '1. Basic Info' },
            { s: 2, label: '2. Description' },
            { s: 3, label: '3. Skills' },
            { s: 4, label: '4. AI Optimization' },
            { s: 5, label: '5. Preview & Publish' },
          ].map((item) => (
            <button
              key={item.s}
              type="button"
              onClick={() => item.s <= step && setStep(item.s)}
              className={`flex items-center gap-1.5 transition-colors ${
                step === item.s
                  ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1'
                  : item.s < step
                  ? 'text-emerald-600 font-medium'
                  : 'text-slate-400'
              }`}
            >
              {item.s < step ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : null}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                placeholder="e.g. Lead Frontend Engineer"
                leftIcon={<Briefcase className="w-4 h-4" />}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Select
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                options={[
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Product Design', label: 'Product Design' },
                  { value: 'Product Management', label: 'Product Management' },
                  { value: 'Growth & Marketing', label: 'Growth & Marketing' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Employment Type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                options={[
                  { value: 'Full-Time', label: 'Full-Time / Founding' },
                  { value: 'Contractor', label: 'Contractor / Freelance' },
                  { value: 'Internship', label: 'Startup Internship' },
                ]}
              />
              <Input
                label="Location"
                placeholder="e.g. Remote (Worldwide)"
                leftIcon={<Building className="w-4 h-4" />}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <Input
              label="Salary / Stipend Range"
              placeholder="e.g. $100,000 - $140,000 / yr"
              leftIcon={<DollarSign className="w-4 h-4" />}
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
            />
          </motion.div>
        )}

        {/* STEP 2: Description & Responsibilities */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <Textarea
              label="Role Overview & Mission"
              rows={4}
              placeholder="Explain the mission, team culture, and impact of this role..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Textarea
              label="Key Responsibilities (One per line)"
              rows={4}
              placeholder="Architect Next.js App Router frontend components..."
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
            />
          </motion.div>
        )}

        {/* STEP 3: Required Skills & Experience */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <Input
              label="Required Skills & Tech Stack (Comma separated)"
              placeholder="e.g. React, Next.js, TypeScript, Tailwind CSS"
              leftIcon={<Code className="w-4 h-4" />}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              helperText="TalentOS AI parses these skills to evaluate candidate profiles semantically."
            />

            <Select
              label="Required Experience Level"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              options={[
                { value: 'Fresher', label: 'Fresher / Graduate' },
                { value: '1-3 Years', label: '1-3 Years Mid Level' },
                { value: '3+ Years Senior Level', label: '3+ Years Senior Level' },
              ]}
            />

            <Textarea
              label="Candidate Requirements (One per line)"
              rows={3}
              placeholder="3+ years of production Next.js experience..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </motion.div>
        )}

        {/* STEP 4: AI Optimization */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <GlassCard glow padding="lg" className="bg-gradient-to-br from-white via-indigo-50/40 to-violet-50/40 border-indigo-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">AI Requisition Audit &amp; Optimization</h4>
                </div>
                <Badge variant="primary" size="sm">Gemini Flash XAI</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Readability Score</span>
                  <span className="text-xl font-bold text-emerald-600 font-mono">98% Clear</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">EEOC Bias Check</span>
                  <span className="text-xl font-bold text-indigo-600 font-mono">100% Passed</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Salary Match</span>
                  <span className="text-xl font-bold text-violet-600 font-mono">Competitive</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleAiOptimize}
                isLoading={aiOptimizing}
                className="w-full justify-center shadow-gradient-glow"
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                {aiOptimized ? 'Re-Run AI Optimization' : 'Optimize Job Requisition with AI'}
              </Button>
            </GlassCard>
          </motion.div>
        )}

        {/* STEP 5: Preview & Publish */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <Card variant="gradient" padding="lg" className="border-indigo-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                <div>
                  <Badge variant="primary" size="sm" className="mb-1">{department}</Badge>
                  <h3 className="text-xl font-extrabold text-slate-900">{title || 'Founding Engineer'}</h3>
                  <p className="text-xs text-slate-500">{location} • {employmentType} • {salaryRange}</p>
                </div>
                <Badge variant="success" size="md" dot>Ready to Publish</Badge>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <p><strong>Overview:</strong> {description || 'Building 0->1 AI hiring features.'}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills.split(',').map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-[11px] font-semibold border border-indigo-100">
                      {sk.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Wizard Controls Bottom */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>

          {step < 5 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setStep(step + 1)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Step {step + 1}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handlePublish}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
              className="bg-emerald-600 hover:bg-emerald-700 shadow-md"
            >
              Publish Job Requisition
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
