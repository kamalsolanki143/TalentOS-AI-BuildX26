'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  Briefcase,
  Users,
  ShieldCheck,
  LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { useAuth } from '@/context/AuthContext';
import { NotificationDropdown } from '@/components/dashboard/NotificationDropdown';
import { ProfileMenu } from '@/components/dashboard/ProfileMenu';

export interface NavLinkItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

// Guest Navigation Links (Marketing Page)
const guestLinks: NavLinkItem[] = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

// Authenticated User Navigation Links (Workspace OS)
const authenticatedLinks: NavLinkItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: '/dashboard/jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
  { href: '/dashboard/candidates', label: 'Candidates', icon: <Users className="w-4 h-4" /> },
  { href: '/ai-transparency', label: 'AI Transparency', icon: <ShieldCheck className="w-4 h-4" /> },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeNavLinks = isAuthenticated ? authenticatedLinks : guestLinks;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  Talent<span className="text-indigo-600">OS</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full">
                  AI CO-PILOT
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/60">
            {activeNavLinks.map((link, idx) => {
              const isActive = pathname === link.href || (link.href !== '/' && !link.href.startsWith('#') && pathname?.startsWith(link.href));
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-white text-indigo-600 shadow-soft-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  )}
                >
                  {link.icon && (
                    <span className={cn('text-current', isActive ? 'text-indigo-600' : 'text-slate-400')}>
                      {link.icon}
                    </span>
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              /* Authenticated Controls: Notifications & ProfileMenu */
              <div className="flex items-center gap-3">
                <NotificationDropdown />
                <ProfileMenu />
              </div>
            ) : (
              /* Guest Controls: Login & Get Started */
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4 text-slate-500" />}>
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {activeNavLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                {link.icon && <span className="text-current">{link.icon}</span>}
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-2 pt-2">
                <ProfileMenu />
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
