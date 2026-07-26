'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scaleIn } from '@/lib/animations';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this data. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      className={cn(
        'w-full p-10 bg-rose-50/50 rounded-3xl border border-rose-200/80 text-center flex flex-col items-center justify-center my-6',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 shadow-soft-sm">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 max-w-md">{message}</p>
      {onRetry && (
        <div className="mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Retry Action
          </Button>
        </div>
      )}
    </motion.div>
  );
};
