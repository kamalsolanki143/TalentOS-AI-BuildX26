'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, Building2, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fadeUp } from '@/lib/animations';

// TODO: Replace DemoAuth with Supabase Auth before production.

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [fullName, setFullName] = useState('Demo Founder');
  const [companyName, setCompanyName] = useState('HyperScale AI');
  const [email, setEmail] = useState('demo@talentos.ai');
  const [password, setPassword] = useState('demopassword');
  const [confirmPassword, setConfirmPassword] = useState('demopassword');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-200' };
    if (pwd.length < 6) return { score: 33, label: 'Weak', color: 'bg-rose-500' };
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
      return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
    }
    return { score: 66, label: 'Medium', color: 'bg-amber-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (password !== confirmPassword) {
      setLoading(false);
      setErrorMsg('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setLoading(false);
      setErrorMsg('Please accept the terms and privacy policy to continue');
      return;
    }

    // Save demo session and redirect to /dashboard
    await login(email, password);

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 400);
  };

  return (
    <AuthLayout>
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-md mx-auto space-y-5"
      >
        {/* Header */}
        <div>
          <Badge variant="primary" size="sm" className="mb-2">
            BuildX’26 Demo Mode
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create your account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Start screening candidates with transparent explainable AI in minutes.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Full Name"
              placeholder="Demo Founder"
              leftIcon={<User className="w-4 h-4" />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              label="Company Name"
              placeholder="HyperScale AI"
              leftIcon={<Building2 className="w-4 h-4" />}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <Input
            label="Work Email Address"
            type="email"
            placeholder="demo@talentos.ai"
            leftIcon={<Mail className="w-4 h-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <Input
              label="Create Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors pointer-events-auto"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Password Strength Meter */}
            {password && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                  <span>Password Strength</span>
                  <span>{strength.label}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <Input
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter password"
            leftIcon={<Lock className="w-4 h-4" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            success={confirmPassword.length > 0 && confirmPassword === password}
            error={confirmPassword.length > 0 && confirmPassword !== password ? 'Passwords do not match' : undefined}
            required
          />

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600 leading-normal">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                I agree to the <Link href="/ai-transparency" className="font-semibold text-indigo-600 hover:underline">Terms of Service</Link> and <Link href="/ai-transparency" className="font-semibold text-indigo-600 hover:underline">Privacy Policy</Link>.
              </span>
            </label>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full justify-center text-sm shadow-gradient-glow"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Demo Workspace
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Already have a TalentOS account?{' '}
          <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Sign In
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
