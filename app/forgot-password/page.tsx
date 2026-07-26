'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Mail, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';
import { supabaseClient } from '@/lib/supabase';
import { fadeUp } from '@/lib/animations';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (supabaseClient) {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`,
        });
        if (error) {
          setErrorMsg(error.message || 'Failed to send reset link');
        } else {
          setSubmitted(true);
        }
      } else {
        setSubmitted(true);
      }
      setLoading(false);
    } catch {
      setSubmitted(true);
      setLoading(false);
    }
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
            Account Recovery
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Reset your password
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enter your work email address and we will send you a secure password reset link.
          </p>
        </div>

        {/* Success Alert Card */}
        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 shadow-soft-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Password Reset Email Sent</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              We have dispatched a reset link to <strong className="font-semibold">{email}</strong>. Please check your inbox and follow the instructions to set a new password.
            </p>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="secondary" size="sm" className="w-full justify-center bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-100/50">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                {errorMsg}
              </div>
            )}

            <Input
              label="Work Email Address"
              type="email"
              placeholder="alex@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full justify-center text-sm shadow-gradient-glow"
                leftIcon={<KeyRound className="w-4 h-4" />}
              >
                Send Reset Password Link
              </Button>
            </div>
          </form>
        )}

        {/* Back Link */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
