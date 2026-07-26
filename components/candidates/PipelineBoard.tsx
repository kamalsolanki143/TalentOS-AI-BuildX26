'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import type { CandidateItem } from './CandidateListCard';
import { Sparkles } from 'lucide-react';

interface PipelineBoardProps {
  candidates: CandidateItem[];
  onSelectCandidate: (candidate: CandidateItem) => void;
  onMoveStage: (candidateId: string, newStatus: CandidateItem['status']) => void;
}

const pipelineStages: CandidateItem['status'][] = [
  'Applied',
  'Screening',
  'AI Ranked',
  'Interview',
  'Offer',
  'Hired',
];

export const PipelineBoard: React.FC<PipelineBoardProps> = ({
  candidates,
  onSelectCandidate,
  onMoveStage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4 select-none">
      {pipelineStages.map((stage) => {
        const stageCandidates = candidates.filter((c) => c.status === stage);

        return (
          <div key={stage} className="bg-slate-100/60 p-3 rounded-2xl border border-slate-200/60 space-y-3 min-w-[220px]">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">{stage}</h4>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-slate-600 rounded-full border border-slate-200">
                {stageCandidates.length}
              </span>
            </div>

            <div className="space-y-3">
              {stageCandidates.length === 0 ? (
                <div className="p-4 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-xl bg-white/50">
                  No candidates
                </div>
              ) : (
                stageCandidates.map((cand) => (
                  <Card
                    key={cand.id}
                    variant="default"
                    hoverEffect
                    onClick={() => onSelectCandidate(cand)}
                    className="p-3.5 cursor-pointer bg-white border border-slate-200/80 space-y-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar name={cand.name} size="sm" />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{cand.name}</h5>
                        <p className="text-[10px] text-slate-500 truncate">{cand.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1 font-mono font-bold text-emerald-600">
                        <Sparkles className="w-3 h-3" />
                        {cand.aiScore}/100
                      </span>
                      <span className="text-[10px] text-slate-400">{cand.experienceYears}y exp</span>
                    </div>

                    {/* Quick advance stage button */}
                    {stage !== 'Hired' && (
                      <div className="pt-1 border-t border-slate-100 flex justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextStageMap: Record<CandidateItem['status'], CandidateItem['status']> = {
                              Applied: 'Screening',
                              Screening: 'AI Ranked',
                              'AI Ranked': 'Interview',
                              Interview: 'Offer',
                              Offer: 'Hired',
                              Hired: 'Hired',
                            };
                            onMoveStage(cand.id, nextStageMap[cand.status]);
                          }}
                          className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          Advance →
                        </button>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
