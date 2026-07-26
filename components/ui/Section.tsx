'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp } from '@/lib/animations';

export interface SectionProps extends HTMLMotionProps<'section'> {
  title?: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'transparent' | 'light' | 'card' | 'glass';
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  padding = 'lg',
  background = 'transparent',
  className,
  children,
  ...props
}) => {
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  };

  const bgClasses = {
    transparent: 'bg-transparent',
    light: 'bg-slate-50/60',
    card: 'bg-white border-y border-slate-150',
    glass: 'glass-panel',
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <motion.section
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      className={cn('relative w-full', paddingClasses[padding], bgClasses[background], className)}
      {...props}
    >
      {(title || subtitle || badge) && (
        <div className={cn('mb-12 flex flex-col', alignClasses[align])}>
          {badge && (
            <span className="inline-flex items-center px-3 py-1 mb-3 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-50 text-indigo-600 border border-indigo-100">
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-section-title text-slate-900 font-semibold tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-body-custom text-slate-500 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
};
