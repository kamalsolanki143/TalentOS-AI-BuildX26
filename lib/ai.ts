/**
 * lib/ai.ts — AI Scoring Stub (v2 — Mentor Feedback Update)
 *
 * TODO: @Nirupama — implement scoreCandidate() with OpenAI / Gemini.
 *
 * MENTOR REQUIREMENT — Explainable AI:
 *   The result must include score_breakdown with per-dimension REASONS,
 *   not just numbers. This powers the "Why 89/100?" UI on the dashboard.
 *
 * Contract:
 *   Input  → AIScoreInput  (candidate profile + job requirements + optional Q&A)
 *   Output → AIScoreResult (five 0-100 scores + summary + score_breakdown)
 */

import type { AIScoreInput, AIScoreResult } from '@/types';

export async function scoreCandidate(input: AIScoreInput): Promise<AIScoreResult> {
  // ── Implementation guide ─────────────────────────────────────────────────
  //
  // RECOMMENDED MODEL (cost optimisation — mentor feedback):
  //   Use Gemini 1.5 Flash (NOT Pro) — ~10x cheaper, fast enough for screening.
  //   Only upgrade to Pro if Flash quality is insufficient.
  //
  // COST OPTIMISATION TIPS:
  //   1. Only send required fields — do NOT send the entire candidate object
  //   2. Cap prompt to ~800 tokens by summarising long fields
  //   3. Cache results — use the upsert in ai-score route (already done)
  //   4. Never re-score unless candidate explicitly requests re-evaluation
  //
  // PROMPT SKELETON:
  // ─────────────────────────────────────────────────────────────────────────
  //   You are an expert hiring assistant for early-stage startups.
  //   Evaluate the candidate below against the job description.
  //
  //   Job:
  //     Title: ${input.job.title}
  //     Requirements: ${input.job.requirements}
  //     Stipend: ${input.job.stipend_range}
  //
  //   Candidate:
  //     Skills: ${input.candidate.skills.join(', ')}
  //     Experience: ${input.candidate.experience}
  //     Availability: ${input.candidate.availability}
  //     Expected Stipend: ${input.candidate.expected_stipend}
  //
  //   Screening Responses:
  //     ${input.responses?.map(r => `Q: ${r.question}\nA: ${r.answer}`).join('\n')}
  //
  //   Return a JSON object with this EXACT shape (no extra text):
  //   {
  //     "skill_fit": <0-100>,
  //     "communication_fit": <0-100>,
  //     "startup_fit": <0-100>,
  //     "availability_fit": <0-100>,
  //     "salary_fit": <0-100>,
  //     "overall_score": <0-100>,
  //     "summary": "<2-3 sentence candidate brief>",
  //     "score_breakdown": {
  //       "skill_fit":         { "score": <n>, "reasons": ["<reason1>", "<reason2>"] },
  //       "communication_fit": { "score": <n>, "reasons": ["<reason1>", "<reason2>"] },
  //       "startup_fit":       { "score": <n>, "reasons": ["<reason1>", "<reason2>"] },
  //       "availability_fit":  { "score": <n>, "reasons": ["<reason1>"] },
  //       "salary_fit":        { "score": <n>, "reasons": ["<reason1>"] }
  //     }
  //   }
  // ─────────────────────────────────────────────────────────────────────────
  //
  // ENV VARS to add to .env.local:
  //   GEMINI_API_KEY=...        ← preferred (cheaper)
  //   OPENAI_API_KEY=...        ← fallback
  //
  // Packages to install (choose one):
  //   npm install @google/generative-ai    ← Gemini
  //   npm install openai                   ← OpenAI
  //
  // ── Score Weights (already applied in lib/utils.ts) ─────────────────────
  //   skill_fit:         30%
  //   startup_fit:       25%
  //   communication_fit: 20%
  //   salary_fit:        15%
  //   availability_fit:  10%
  // ─────────────────────────────────────────────────────────────────────────

  void input;

  throw new Error(
    'AI scoring not yet implemented. See lib/ai.ts for the implementation guide.'
  );
}
