'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeUp } from '@/lib/animations';

export interface SuccessAlertProps {
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  title,
  description,
  onClose,
  className,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        'w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 flex items-start gap-3.5 shadow-soft-sm',
        className
      )}
    >
      <div className="p-1 text-emerald-600 shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-emerald-950">{title}</h4>
        {description && <p className="mt-0.5 text-xs text-emerald-700">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};
