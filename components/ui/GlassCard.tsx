'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  glow = false,
  padding = 'md',
  className,
  children,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(
        'rounded-2xl glass-card transition-all duration-300 relative overflow-hidden',
        glow && 'hover:shadow-gradient-glow hover:border-indigo-200/80',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {/* Decorative subtle ambient gradient spot */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
};
