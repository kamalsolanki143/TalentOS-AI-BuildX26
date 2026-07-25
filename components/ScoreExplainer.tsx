"use client";

import { useState } from "react";
import ScoreBreakdownCard from "./ScoreBreakdownCard";
import type { ScoreBreakdown } from "@/types";

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
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
      >
        <span className="transform transition-transform duration-200" style={{ display: "inline-block", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
          ▶
        </span>
        {isOpen ? "Hide AI Analysis" : `View AI Analysis${overallScore ? ` — Why ${overallScore}/100?` : ""}`}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <ScoreBreakdownCard scoreBreakdown={scoreBreakdown} summary={summary} />
      </div>
    </div>
  );
}
