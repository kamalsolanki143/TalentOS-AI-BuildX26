import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}) => {
  const variantClasses = {
    text: 'h-4 rounded-md w-full',
    circular: 'rounded-full shrink-0',
    rectangular: 'rounded-none w-full',
    rounded: 'rounded-2xl w-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200/80',
        variantClasses[variant],
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="p-6 bg-white rounded-2xl border border-slate-200/80 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" width={60} height={20} />
    </div>
    <Skeleton variant="text" width="75%" height={24} />
    <Skeleton variant="text" width="100%" height={16} />
    <Skeleton variant="text" width="90%" height={16} />
    <div className="pt-4 flex justify-between items-center">
      <Skeleton variant="text" width={100} height={36} className="rounded-xl" />
      <Skeleton variant="text" width={80} height={20} />
    </div>
  </div>
);
