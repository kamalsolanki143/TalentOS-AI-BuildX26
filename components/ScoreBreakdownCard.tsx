"use client";

import type { ScoreBreakdown } from "@/types";

type ScoreBreakdownCardProps = {
  scoreBreakdown: ScoreBreakdown;
  summary?: string | null;
};

const DIMENSIONS = [
  { key: "skill_fit" as const, label: "Skill Fit", weight: "30%" },
  { key: "startup_fit" as const, label: "Startup Fit", weight: "25%" },
  { key: "communication_fit" as const, label: "Communication", weight: "20%" },
  { key: "salary_fit" as const, label: "Salary Fit", weight: "15%" },
  { key: "availability_fit" as const, label: "Availability", weight: "10%" },
];

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

function getScoreBadgeColor(score: number): string {
  if (score >= 80) return "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30";
  if (score >= 60) return "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30";
  if (score >= 40) return "text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30";
  return "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30";
}

export default function ScoreBreakdownCard({ scoreBreakdown, summary }: ScoreBreakdownCardProps) {
  return (
    <div className="space-y-4">
      {/* AI Summary */}
      {summary && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm font-medium text-black dark:text-white mb-1">AI Summary</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{summary}</p>
        </div>
      )}

      {/* Dimension Scores */}
      <div className="space-y-3">
        {DIMENSIONS.map(({ key, label, weight }) => {
          const dimension = scoreBreakdown[key];
          if (!dimension) return null;

          return (
            <div
              key={key}
              className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700"
            >
              {/* Header: label + score + weight */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-black dark:text-white">
                  {label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">({weight})</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${getScoreBadgeColor(dimension.score)}`}
                  >
                    {dimension.score}/100
                  </span>
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 mb-3">
                <div
                  className={`${getScoreColor(dimension.score)} h-1.5 rounded-full transition-all`}
                  style={{ width: `${dimension.score}%` }}
                />
              </div>

              {/* Reasons */}
              <ul className="space-y-1">
                {dimension.reasons.map((reason, idx) => (
                  <li key={idx} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-2">
                    <span className="mt-0.5">
                      {dimension.score >= 60 ? "✅" : "⚠️"}
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
