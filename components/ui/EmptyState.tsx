'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scaleIn } from '@/lib/animations';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}) => {
  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      className={cn(
        'w-full p-12 bg-white rounded-3xl border border-dashed border-slate-200 text-center flex flex-col items-center justify-center my-6',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100/80 shadow-soft-sm">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-slate-500 max-w-md leading-relaxed">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </motion.div>
  );
};
