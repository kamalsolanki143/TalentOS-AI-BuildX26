import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

type ScoreBadgeProps = {
  score: number;
  className?: string;
};

export default function ScoreBadge({ score, className }: ScoreBadgeProps) {
  let variant: 'success' | 'accent' | 'warning' | 'danger' = 'warning';
  let label = 'Average Fit';
  let icon = <TrendingUp className="w-3 h-3" />;

  if (score >= 90) {
    label = 'Excellent Fit';
    variant = 'success';
    icon = <Sparkles className="w-3 h-3 text-emerald-600" />;
  } else if (score >= 75) {
    label = 'Strong Fit';
    variant = 'accent';
    icon = <CheckCircle2 className="w-3 h-3 text-blue-600" />;
  } else if (score >= 60) {
    label = 'Good Fit';
    variant = 'accent';
    icon = <CheckCircle2 className="w-3 h-3 text-blue-600" />;
  }

  return (
    <Badge variant={variant} size="md" leftIcon={icon} className={className}>
      <span className="font-bold">{score}/100</span>
      <span className="opacity-40">•</span>
      <span>{label}</span>
    </Badge>
  );
}