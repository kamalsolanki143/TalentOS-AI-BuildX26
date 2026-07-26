'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: 'Rahul Sharma scored 95/100', subtitle: 'Lead Frontend Engineer requisition', time: '5m ago', read: false },
    { id: 2, title: 'AI evaluation batch completed', subtitle: '5 new candidate scorecards ready', time: '1h ago', read: false },
    { id: 3, title: 'New application from Priya Singh', subtitle: 'UI/UX Product Designer role', time: '3h ago', read: true },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-soft-xl py-2 z-50 overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Notifications</h4>
              <Badge variant="primary" size="sm">3 New</Badge>
            </div>
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">{n.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{n.subtitle}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
