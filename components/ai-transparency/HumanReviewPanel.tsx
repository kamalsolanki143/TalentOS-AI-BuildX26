'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/hooks/useToast';
import { CheckCircle2, Sliders } from 'lucide-react';

export const HumanReviewPanel: React.FC = () => {
  const { toast } = useToast();
  const [overrideScore, setOverrideScore] = useState(95);
  const [comments, setComments] = useState('');
  const [reviewed, setReviewed] = useState(false);

  const handleApprove = () => {
    setReviewed(true);
    toast({
      title: 'AI Recommendation Approved',
      description: `Founder approved score of ${overrideScore}/100 and moved candidate to shortlist.`,
      variant: 'success',
    });
  };

  const handleOverride = () => {
    setReviewed(true);
    toast({
      title: 'Manual Score Override Saved',
      description: `Updated score to ${overrideScore}/100 with founder override comments logged in audit history.`,
      variant: 'warning',
    });
  };

  return (
    <Card variant="gradient" padding="lg" className="border-indigo-100 shadow-soft-md space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Human Founder Review &amp; Override Controls</h3>
          <p className="text-xs text-slate-500">Human-in-the-loop governance interface</p>
        </div>
        {reviewed ? (
          <Badge variant="success" size="sm">Founder Approved</Badge>
        ) : (
          <Badge variant="warning" size="sm">Pending Review</Badge>
        )}
      </div>

      <div className="space-y-4 text-xs">
        <div>
          <div className="flex justify-between font-bold text-slate-900 mb-1">
            <span>Manual Candidate Score Override</span>
            <span className="font-mono text-indigo-600">{overrideScore} / 100</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={overrideScore}
            onChange={(e) => setOverrideScore(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <Textarea
          label="Founder Review Comments"
          rows={3}
          placeholder="Add manual review feedback or reason for score override..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleOverride}
            leftIcon={<Sliders className="w-3.5 h-3.5 text-amber-600" />}
          >
            Save Manual Override
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleApprove}
            leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
            className="shadow-gradient-glow"
          >
            Approve AI Recommendation
          </Button>
        </div>
      </div>
    </Card>
  );
};
