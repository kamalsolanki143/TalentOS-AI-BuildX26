'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'bordered' | 'flat' | 'gradient';
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverEffect = true,
  padding = 'md',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-white border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md',
    bordered:
      'bg-white border-2 border-slate-100 shadow-none',
    flat:
      'bg-slate-50/80 border border-slate-100 shadow-none',
    gradient:
      'bg-gradient-to-b from-white to-slate-50/80 border border-slate-200/70 shadow-soft-sm',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      variants={hoverEffect ? cardHover : undefined}
      initial="rest"
      whileHover={hoverEffect ? 'hover' : undefined}
      className={cn(
        'rounded-2xl transition-all duration-200 relative overflow-hidden',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={cn('text-card-title text-slate-900 font-semibold tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn('text-small-custom text-slate-500', className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('mt-6 pt-4 border-t border-slate-100 flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);
