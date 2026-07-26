'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Briefcase,
  CheckCircle2,
  Cpu,
  BarChart3,
  Star,
  ChevronDown,
  Building2,
  BrainCircuit,
  Bot,
  Scale,
  Award,
} from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const featureList = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-indigo-600" />,
      title: 'AI Resume Ranking',
      description: 'Semantic parsing extracts experience depth, framework expertise, and project complexity rather than exact keyword matches.',
      badge: '0–100 Scoring',
    },
    {
      icon: <Cpu className="w-6 h-6 text-violet-600" />,
      title: 'Explainable AI',
      description: 'Transparent 5-dimension analysis detailing exactly why candidate A scored 92/100 while candidate B scored 64/100.',
      badge: 'Audit-Ready',
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      title: 'Smart Job Creation',
      description: 'Generate context-aware job descriptions and screening criteria tailored for early-stage startup roles in 60 seconds.',
      badge: '60s Generator',
    },
    {
      icon: <Bot className="w-6 h-6 text-emerald-600" />,
      title: 'Automated Interview Kits',
      description: 'Dynamic interview question sets generated automatically based on candidate skill gaps and resume discrepancies.',
      badge: 'Custom Rubrics',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-amber-500" />,
      title: 'Candidate Analytics',
      description: 'Track candidate throughput, time-to-shortlist, and source performance across your startup hiring funnel.',
      badge: 'Real-time Metrics',
    },
    {
      icon: <Scale className="w-6 h-6 text-purple-600" />,
      title: 'Hiring Bias Mitigation',
      description: 'Non-demographic initial evaluation pass ensures fair candidate scoring purely based on skill, mindset, and experience.',
      badge: 'EEOC Compliant',
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'Upload Job Requisition', desc: 'Define role title, tech stack, experience, and budget requirements in 2 minutes.', icon: <Briefcase className="w-5 h-5 text-indigo-600" /> },
    { step: '02', title: 'Receive Applications', desc: 'Share your public job portal link. Applicants submit resumes with zero friction.', icon: <Users className="w-5 h-5 text-violet-600" /> },
    { step: '03', title: 'AI Co-Pilot Ranking', desc: 'Gemini Flash evaluates profiles against 5 weighted dimensions in under 3 seconds.', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    { step: '04', title: 'Human Founder Review', desc: 'Inspect transparent score rationales and click to shortlist top candidates.', icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> },
    { step: '05', title: 'Hire Top 1% Talent', desc: 'Send direct WhatsApp updates and offer invites to move talent to offer stage.', icon: <Award className="w-5 h-5 text-emerald-600" /> },
  ];

  const testimonials = [
    {
      quote: "TalentOS saved us 25 hours per week when hiring our Founding Frontend Engineer. The explainable AI breakdown gave us total confidence in our shortlist.",
      name: "Alex Rivera",
      role: "Founder & CEO, HyperScale AI",
      avatar: "AR",
      stars: 5,
    },
    {
      quote: "Unlike legacy ATS platforms that felt administrative, TalentOS is built for founder speed. We launched a job requisition and shortlisted 5 top engineers in 24 hours.",
      name: "Priya Nair",
      role: "CTO, CloudPulse (Series A)",
      avatar: "PN",
      stars: 5,
    },
    {
      quote: "The non-demographic explainable AI scoring is game-changing. We hire purely based on true skill alignment and startup mindset depth.",
      name: "Marcus Vance",
      role: "VP Engineering, Antler Cohort Founder",
      avatar: "MV",
      stars: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter (Hackathon Edition)",
      price: "$0",
      period: "Free during BuildX’26",
      desc: "Perfect for seed-stage solo founders hiring their first 1–3 employees.",
      features: [
        "1 Active Job Opening",
        "Up to 50 Applicants / Month",
        "AI Resume Scoring (0–100)",
        "Explainable AI Score Breakdowns",
        "Kanban Applicant Pipeline Board",
      ],
      popular: false,
      cta: "Start Free",
      href: "/dashboard/jobs",
    },
    {
      name: "Growth Co-Pilot",
      price: "$49",
      period: "per month",
      desc: "Designed for fast-growing startups scaling engineering & product teams.",
      features: [
        "5 Active Job Openings",
        "Unlimited Applicants",
        "Full Explainable AI Analysis",
        "AI Job Description Generator",
        "Custom Candidate Scorecards",
        "WhatsApp & Email Automation",
      ],
      popular: true,
      cta: "Launch Growth Plan",
      href: "/dashboard/jobs",
    },
    {
      name: "Scale Operating System",
      price: "$149",
      period: "per month",
      desc: "For Series A scaleups needing team review, scorecards & advanced analytics.",
      features: [
        "Unlimited Active Openings",
        "Unlimited Applicants",
        "Team Collaborative Reviews",
        "Automated Screening Kits",
        "EEOC/GDPR Bias Audit Logs",
        "Dedicated Founder Support",
      ],
      popular: false,
      cta: "Contact Sales",
      href: "/dashboard/jobs",
    },
  ];

  const faqs = [
    {
      q: "How does TalentOS differ from legacy ATS platforms like Greenhouse or Lever?",
      a: "Legacy ATS platforms act as passive databases relying on exact keyword matching. TalentOS is an AI Hiring Co-Pilot designed for founders—it evaluates semantic skill depth, gives transparent 0–100 score breakdowns, and requires zero complex onboarding setup."
    },
    {
      q: "What makes TalentOS AI explainable?",
      a: "Rather than providing arbitrary rejection numbers, TalentOS evaluates candidates across 5 weighted dimensions (Skill Fit, Startup Fit, Communication, Salary, Availability) and lists explicit, non-demographic reasons for every score."
    },
    {
      q: "Does TalentOS use demographic data for candidate ranking?",
      a: "Never. TalentOS strips all demographic indicators (photo, age, gender, ethnicity) during evaluation passes. Candidates are evaluated purely on verified skills, portfolio evidence, and role requirements."
    },
    {
      q: "How long does it take to set up a job requisition?",
      a: "Under 3 minutes. You can create a job, configure AI evaluation criteria, and publish a public application portal link immediately."
    },
    {
      q: "Is TalentOS free to try for BuildX’26 hackathon users?",
      a: "Yes! Startup founders can sign up and use TalentOS starter features completely free during the BuildX’26 release."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col relative overflow-hidden font-sans">
      {/* Background Ambient Lighting Blobs (Step 6) */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-tr from-indigo-500/5 via-violet-500/5 to-blue-500/3 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-[35%] -right-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-[70%] -left-40 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      {/* 1. Premium Announcement Bar */}
      <div className="w-full bg-slate-900 text-white py-2.5 px-4 text-center text-xs font-medium border-b border-slate-800 flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider text-[10px] border border-indigo-400/30">
          BuildX’26 Special
        </span>
        <span>Trusted by 200+ AI-first startup founders worldwide</span>
        <ArrowRight className="w-3.5 h-3.5 text-indigo-400 hidden sm:inline" />
      </div>

      {/* Main Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Section padding="lg" background="transparent" className="pt-10 md:pt-16 pb-16">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="lg:col-span-7 space-y-8 text-left"
            >
              {/* Animated Badge */}
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-200 shadow-soft-sm">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    AI-Powered Hiring Co-Pilot
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                </div>
              </motion.div>

              {/* Huge Bold Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-hero text-slate-900 font-extrabold tracking-tight leading-none"
              >
                The AI Hiring OS for Startups That Move{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                  10x Faster
                </span>
              </motion.h1>

              {/* Supporting Paragraph */}
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium"
              >
                TalentOS automates candidate screening, semantic fit scoring, and recruitment workflows—giving founders transparent, explainable match reasons without an HR department.
              </motion.p>

              {/* Two CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/dashboard/jobs">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="shadow-gradient-glow text-base px-8 py-4"
                  >
                    Start Hiring — Free
                  </Button>
                </Link>

                <Link href="/ai-transparency">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<ShieldCheck className="w-5 h-5 text-indigo-600" />}
                    className="text-base px-6 py-4"
                  >
                    Explore AI Transparency
                  </Button>
                </Link>
              </motion.div>

              {/* Trusted Logos Below */}
              <motion.div variants={fadeUp} className="pt-8 border-t border-slate-200/80 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Powering Early-Stage Teams At
                </span>
                <div className="flex flex-wrap items-center gap-8 text-slate-400 font-bold text-sm">
                  <span className="hover:text-slate-700 transition-colors flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> HyperScale AI
                  </span>
                  <span className="hover:text-slate-700 transition-colors flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> CloudPulse
                  </span>
                  <span className="hover:text-slate-700 transition-colors flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Antler Cohort
                  </span>
                  <span className="hover:text-slate-700 transition-colors flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> BuildX'26 Labs
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Dashboard Mockup Right (Step 2) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <GlassCard glow padding="lg" className="p-6 bg-white border-slate-200/80 shadow-soft-xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <Badge variant="success" size="sm" dot>AI Match Engine Active</Badge>
                  </div>

                  {/* Candidate Preview Item 1 */}
                  <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar name="Rahul Sharma" size="md" status="online" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Rahul Sharma</h4>
                          <p className="text-xs text-slate-500">Lead Frontend Engineer</p>
                        </div>
                      </div>
                      <Badge variant="success" size="sm">95/100 Fit</Badge>
                    </div>
                    <div className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-indigo-100/60 font-medium">
                      ✨ Direct Next.js expertise + proven 0→1 startup ownership.
                    </div>
                  </div>

                  {/* Candidate Preview Item 2 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar name="Priya Singh" size="md" status="online" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Priya Singh</h4>
                          <p className="text-xs text-slate-500">UI/UX Product Designer</p>
                        </div>
                      </div>
                      <Badge variant="accent" size="sm">82/100 Fit</Badge>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 3. Product Showcase */}
      <Section title="Product Showcase & Candidate Ranking Panel" subtitle="Inspect full explainable AI score cards and rank applicants in real time." background="light">
        <Container size="xl">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft-xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Live AI Candidate Shortlist Board</h3>
                  <p className="text-xs text-slate-500">Evaluated across 5 non-demographic score dimensions</p>
                </div>
              </div>
              <Badge variant="primary" size="md">Real-time Ranking Engine</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Review Time Reduction" value="85%" change="From 23h to 3h" changeType="positive" icon={<Zap className="w-5 h-5 text-indigo-600" />} />
              <StatCard title="Explainable Match Rate" value="94.8%" change="High Recruiter Trust" changeType="positive" icon={<Cpu className="w-5 h-5 text-indigo-600" />} />
              <StatCard title="Candidate Drop-Off" value="< 4%" change="1-Click Application" changeType="positive" icon={<Users className="w-5 h-5 text-emerald-600" />} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Feature Grid (6 Premium Cards) */}
      <Section id="features" title="Built Specifically for Startup Founder Speed" subtitle="Every feature is designed to save time, eliminate bias, and help you hire top talent." background="transparent">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureList.map((feat, idx) => (
              <Card key={idx} variant="gradient" hoverEffect className="group p-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-card-title text-slate-900 font-semibold">{feat.title}</h3>
                </div>
                <p className="text-small-custom text-slate-600 leading-relaxed mb-6">{feat.description}</p>
                <Badge variant="neutral" size="sm">{feat.badge}</Badge>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. How TalentOS Works (Horizontal Timeline) */}
      <Section id="how-it-works" title="How TalentOS Works in 5 Steps" subtitle="A seamless horizontal timeline from job creation to final offer." background="light">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowSteps.map((item) => (
              <GlassCard key={item.step} className="p-6 relative group bg-white border-slate-200/80">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-indigo-600/30 group-hover:text-indigo-600 transition-colors font-mono">
                    {item.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. AI Transparency Preview */}
      <Section title="Explainable AI — We Show the 'Why'" subtitle="No opaque numbers or black-box algorithms. Inspect every score breakdown." background="transparent">
        <Container size="lg">
          <Card variant="gradient" padding="lg" className="border-indigo-100">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Score Dimension Weight Matrix</h3>
                  <p className="text-xs text-slate-500">Transparent non-demographic score calculations</p>
                </div>
              </div>
              <Badge variant="primary" size="md">Deterministic AI Formula</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-6 text-center">
              <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                <span className="text-lg font-bold text-indigo-600">30%</span>
                <p className="text-xs text-slate-500 mt-1">Skill Fit</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                <span className="text-lg font-bold text-violet-600">25%</span>
                <p className="text-xs text-slate-500 mt-1">Startup Fit</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                <span className="text-lg font-bold text-blue-600">20%</span>
                <p className="text-xs text-slate-500 mt-1">Communication</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                <span className="text-lg font-bold text-emerald-600">15%</span>
                <p className="text-xs text-slate-500 mt-1">Salary Fit</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                <span className="text-lg font-bold text-amber-500">10%</span>
                <p className="text-xs text-slate-500 mt-1">Availability</p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* 7. Testimonials */}
      <Section title="Loved by Startup Founders" subtitle="See how early-stage teams use TalentOS to hire founding engineers and designers." background="light">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <Card key={idx} variant="default" padding="lg" hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic mb-6">
                    &quot;{test.quote}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <Avatar name={test.avatar} size="md" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{test.name}</h4>
                    <p className="text-xs text-slate-500">{test.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Pricing Preview */}
      <Section id="pricing" title="Simple, Transparent Startup Pricing" subtitle="Zero multi-thousand-dollar enterprise lock-ins. Pay as you scale." background="transparent">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                variant={plan.popular ? 'default' : 'bordered'}
                padding="lg"
                hoverEffect
                className={`flex flex-col justify-between relative ${
                  plan.popular ? 'border-2 border-indigo-600 shadow-soft-xl bg-white' : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">{plan.desc}</p>

                  <ul className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={plan.href}>
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. FAQ Section */}
      <Section id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about TalentOS and AI candidate evaluation." background="light">
        <Container size="md">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} variant="default" padding="md" hoverEffect={false} className="cursor-pointer" onClick={() => toggleFaq(idx)}>
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-base font-bold text-slate-900">{faq.q}</h4>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-indigo-600' : ''}`} />
                </div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. Final CTA */}
      <Section background="transparent" padding="lg">
        <Container size="lg">
          <GlassCard glow className="p-10 md:p-14 text-center bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white rounded-3xl border border-indigo-500/20 shadow-soft-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <Badge variant="primary" size="md" className="bg-indigo-500/20 text-indigo-200 border-indigo-400/30">
                BuildX’26 Platform
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Start Hiring Top 1% Talent Today
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Automate screening, rank candidates with transparent AI, and hire faster than ever before.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link href="/dashboard/jobs">
                  <Button variant="primary" size="lg" className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600">
                    Create Your First Job Requisition
                  </Button>
                </Link>
                <Link href="/ai-transparency">
                  <Button variant="secondary" size="lg" className="px-6 py-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Read AI Transparency Guide
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </Container>
      </Section>

      {/* 11. Modern Footer */}
      <Footer />
    </div>
  );
}