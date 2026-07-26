'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Lock, Bell, HelpCircle, LogOut, Sparkles, Building2 } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';

export const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = user?.name || 'Founder Workspace';
  const userEmail = user?.email || 'demo@talentos.ai';
  const userRole = user?.role || 'Founder';

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      >
        <Avatar name={userName} size="sm" status="online" />
        <span className="text-xs font-semibold text-slate-700 hidden sm:inline">{userName}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-soft-xl py-2 z-50 overflow-hidden select-none"
          >
            {/* Header info */}
            <div className="px-4 py-3 border-b border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 truncate">{userName}</span>
                <Badge variant="primary" size="sm">{userRole}</Badge>
              </div>
              <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
            </div>

            {/* Menu Items */}
            <div className="py-1 text-xs text-slate-700 divide-y divide-slate-100">
              <div className="py-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>View Profile &amp; Edit</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </Link>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/settings?tab=security"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span>Change Password</span>
                </Link>
                <Link
                  href="/dashboard/settings?tab=notifications"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  <Bell className="w-4 h-4 text-slate-400" />
                  <span>Notification Preferences</span>
                </Link>
              </div>

              <div className="py-1">
                <a
                  href="mailto:support@talentos.ai"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Help &amp; Support</span>
                </a>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-rose-50 text-rose-600 transition-colors font-medium text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
