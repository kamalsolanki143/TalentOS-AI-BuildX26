import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  variant?: 'slate' | 'indigo' | 'emerald' | 'amber';
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  onRemove,
  variant = 'indigo',
  className,
  children,
  ...props
}) => {
  const variants = {
    slate: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-current opacity-60 hover:opacity-100 transition-opacity rounded p-0.5"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
