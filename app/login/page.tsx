'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fadeUp } from '@/lib/animations';

// TODO: Replace DemoAuth with Supabase Auth before production.

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@talentos.ai');
  const [password, setPassword] = useState('demopassword');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save demo session and redirect to /dashboard
    await login(email, password);

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 400);
  };

  const handleDemoQuickLogin = async () => {
    setLoading(true);
    await login('demo@talentos.ai', 'demo123');
    router.push('/dashboard');
  };

  return (
    <AuthLayout>
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-md mx-auto space-y-6"
      >
        {/* Header */}
        <div>
          <Badge variant="primary" size="sm" className="mb-2">
            BuildX’26 Hackathon Demo Mode
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in with any credentials to access the TalentOS demo workspace.
          </p>
        </div>

        {/* Demo Callout */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-indigo-700">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span>Instant Demo Mode Active</span>
          </div>
          <p className="text-[11px] text-indigo-600 leading-relaxed">
            No environment variables required. Click <strong>Demo Login</strong> to enter.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Work Email Address"
            type="email"
            placeholder="demo@talentos.ai"
            leftIcon={<Mail className="w-4 h-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-1">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
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
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Remember this device</span>
            </label>
            <Link
              href="/forgot-password"
              className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="pt-2 space-y-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full justify-center text-sm shadow-gradient-glow"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Demo Login
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-slate-200" />
          <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            or quick access
          </span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        {/* 1-Click Demo Login Button */}
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={handleDemoQuickLogin}
          className="w-full justify-center text-xs font-semibold"
          leftIcon={<Zap className="w-4 h-4 text-indigo-600" />}
        >
          1-Click Instant Demo Login
        </Button>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Create a free account
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
