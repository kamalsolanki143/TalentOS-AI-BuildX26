'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import { useAuth } from '@/context/AuthContext';

export interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

const defaultSidebarGroups: SidebarGroup[] = [
  {
    title: 'Recruitment',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { href: '/dashboard/jobs', label: 'Jobs & Openings', icon: <Briefcase className="w-5 h-5" /> },
      { href: '/dashboard/candidates', label: 'Candidates', icon: <Users className="w-5 h-5" /> },
    ],
  },
  {
    title: 'AI & Intelligence',
    items: [
      { href: '/ai-transparency', label: 'AI Transparency', icon: <ShieldCheck className="w-5 h-5" />, badge: 'Explainable' },
    ],
  },
  {
    title: 'System & Account',
    items: [
      { href: '/dashboard/profile', label: 'Edit Profile', icon: <User className="w-5 h-5" /> },
      { href: '/dashboard/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const userName = user?.name || 'Founder Workspace';

  return (
    <aside
      className={cn(
        'sticky top-0 h-screen glass-panel border-r border-slate-200/80 bg-white/80 transition-all duration-300 z-30 flex flex-col justify-between select-none',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div>
        {/* Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">
                Talent<span className="text-indigo-600">OS</span>
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="p-4 space-y-6 overflow-y-auto">
          {defaultSidebarGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              {!collapsed && group.title && (
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-soft-sm'
                        : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                    )}
                  >
                    <span className={cn('shrink-0', isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600')}>
                      {item.icon}
                    </span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold uppercase bg-indigo-100 text-indigo-700 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Profile */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <Link href="/dashboard/profile" className={cn('flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-xl transition-colors', collapsed && 'justify-center')}>
          <Avatar name={userName} size="md" status="online" />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-xs text-slate-400 truncate">BuildX Pro Plan</span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};
