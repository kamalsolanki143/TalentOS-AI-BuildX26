'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import ScoreBreakdownCard from './ScoreBreakdownCard';
import type { ScoreBreakdown } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

type ScoreExplainerProps = {
  scoreBreakdown: ScoreBreakdown;
  summary?: string | null;
  overallScore?: number;
};

export default function ScoreExplainer({
  scoreBreakdown,
  summary,
  overallScore,
}: ScoreExplainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 pt-3 border-t border-slate-100">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors py-1 group"
      >
        <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </div>
        <Sparkles className="w-3.5 h-3.5" />
        <span>
          {isOpen
            ? 'Hide Explainable AI Rationale'
            : `View AI Score Breakdown${overallScore ? ` (Why ${overallScore}/100?)` : ''}`}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-3"
          >
            <ScoreBreakdownCard scoreBreakdown={scoreBreakdown} summary={summary} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
