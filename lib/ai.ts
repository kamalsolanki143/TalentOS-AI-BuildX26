/**
 * lib/ai.ts — AI Scoring Stub
 *
 * TODO: @Nirupama — implement scoreCandidate() with OpenAI / Gemini.
 *
 * Contract:
 *   Input  → AIScoreInput  (candidate profile + job requirements + optional Q&A)
 *   Output → AIScoreResult (five 0-100 dimension scores + summary text)
 *
 * The backend will:
 *   1. Call this function from /api/ai-score and /api/n8n/webhook
 *   2. Persist the returned result into the `scores` Supabase table
 *   3. Compute overall_score via computeOverallScore() in lib/utils.ts
 *      (you can also return overall_score directly from the AI and it will
 *       be stored as-is if you prefer the AI to own the weighting)
 */

import type { AIScoreInput, AIScoreResult } from '@/types';

export async function scoreCandidate(input: AIScoreInput): Promise<AIScoreResult> {
  // ── Implementation guide ─────────────────────────────────────────────────
  //
  // 1. Build a prompt from input.candidate, input.job, and input.responses
  // 2. Call your preferred model (OpenAI GPT-4o / Gemini 1.5 Pro)
  // 3. Ask for a structured JSON response in the shape of AIScoreResult
  // 4. Validate and return it
  //
  // Example prompt skeleton:
  //   You are an expert hiring assistant for early-stage startups.
  //   Evaluate the following candidate against the job description.
  //   Return a JSON object with keys:
  //     skill_fit (0-100), communication_fit (0-100), startup_fit (0-100),
  //     availability_fit (0-100), salary_fit (0-100), overall_score (0-100),
  //     summary (string, max 3 sentences).
  //
  // ── Useful env vars (add to .env.local) ─────────────────────────────────
  //   OPENAI_API_KEY=...
  //   GEMINI_API_KEY=...
  //
  // ── Input shape reference ────────────────────────────────────────────────
  //   input.candidate.name, .skills, .experience, .availability,
  //                         .expected_stipend
  //   input.job.title, .description, .requirements, .stipend_range
  //   input.responses[].question, .answer   (WhatsApp screening answers)
  //
  // ────────────────────────────────────────────────────────────────────────

  // Suppress unused-variable linting until implemented
  void input;

  throw new Error(
    'AI scoring not yet implemented. ' +
    'See lib/ai.ts for the implementation guide.'
  );
}
