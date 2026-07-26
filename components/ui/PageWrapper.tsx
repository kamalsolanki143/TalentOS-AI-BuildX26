'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { pageTransition } from '@/lib/animations';

export interface PageWrapperProps extends HTMLMotionProps<'main'> {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        'min-h-screen w-full bg-ambient-light text-slate-900 flex flex-col relative selection:bg-indigo-100 selection:text-indigo-900',
        className
      )}
      {...props}
    >
      {/* Subtle Ambient Radial Lighting Circles (Step 6) */}
      <div className="pointer-events-none absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-1/3 right-10 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl -z-10" />

      {children}
    </motion.main>
  );
};
