/**
 * lib/ai.ts — AI Scoring Engine (Gemini 3.6 Flash)
 *
 * Implements the candidate scoring pipeline:
 *   1. Receives candidate profile + job requirements + optional screening Q&A
 *   2. Sends structured prompt to Gemini Flash with JSON schema enforcement
 *   3. Returns 5 dimension scores (0-100) + overall weighted score + summary
 *   4. Includes score_breakdown with per-dimension REASONS (Explainable AI)
 *
 * Cost: ~$0.0001 per evaluation using Gemini Flash structured output.
 * Caching: Handled by the /api/ai-score route via Supabase upsert.
 */

import { GoogleGenAI } from '@google/genai';
import type { AIScoreInput, AIScoreResult } from '@/types';

// ── Gemini Client (singleton) ───────────────────────────────────────────────
const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

const MODEL = 'gemini-2.5-flash';

// ── JSON Schema for structured output ───────────────────────────────────────
const SCORE_RESULT_SCHEMA = {
  type: 'object' as const,
  properties: {
    skill_fit: { type: 'integer' as const, description: 'Skill match score 0-100' },
    communication_fit: { type: 'integer' as const, description: 'Communication quality score 0-100' },
    startup_fit: { type: 'integer' as const, description: 'Startup culture fit score 0-100' },
    availability_fit: { type: 'integer' as const, description: 'Availability match score 0-100' },
    salary_fit: { type: 'integer' as const, description: 'Salary expectations match score 0-100' },
    overall_score: { type: 'integer' as const, description: 'Weighted overall score 0-100' },
    summary: { type: 'string' as const, description: '2-3 sentence candidate brief' },
    score_breakdown: {
      type: 'object' as const,
      properties: {
        skill_fit: {
          type: 'object' as const,
          properties: {
            score: { type: 'integer' as const },
            reasons: { type: 'array' as const, items: { type: 'string' as const } },
          },
          required: ['score', 'reasons'],
        },
        communication_fit: {
          type: 'object' as const,
          properties: {
            score: { type: 'integer' as const },
            reasons: { type: 'array' as const, items: { type: 'string' as const } },
          },
          required: ['score', 'reasons'],
        },
        startup_fit: {
          type: 'object' as const,
          properties: {
            score: { type: 'integer' as const },
            reasons: { type: 'array' as const, items: { type: 'string' as const } },
          },
          required: ['score', 'reasons'],
        },
        availability_fit: {
          type: 'object' as const,
          properties: {
            score: { type: 'integer' as const },
            reasons: { type: 'array' as const, items: { type: 'string' as const } },
          },
          required: ['score', 'reasons'],
        },
        salary_fit: {
          type: 'object' as const,
          properties: {
            score: { type: 'integer' as const },
            reasons: { type: 'array' as const, items: { type: 'string' as const } },
          },
          required: ['score', 'reasons'],
        },
      },
      required: ['skill_fit', 'communication_fit', 'startup_fit', 'availability_fit', 'salary_fit'],
    },
  },
  required: [
    'skill_fit',
    'communication_fit',
    'startup_fit',
    'availability_fit',
    'salary_fit',
    'overall_score',
    'summary',
    'score_breakdown',
  ],
};

// ── Helper: Truncate long text to save tokens ───────────────────────────────
function truncate(text: string | null | undefined, maxLength: number): string {
  if (!text) return 'Not provided';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// ── Helper: Build the evaluation prompt ─────────────────────────────────────
function buildPrompt(input: AIScoreInput): string {
  const { candidate, job, responses } = input;

  const screeningSection =
    responses && responses.length > 0
      ? responses
          .map((r) => `Q: ${truncate(r.question, 200)}\nA: ${truncate(r.answer, 300)}`)
          .join('\n')
      : 'No screening responses provided';

  return `You are an expert hiring assistant for early-stage startups.
Evaluate the candidate below against the job description.
Score strictly — not every candidate is a strong fit.

Job:
  Title: ${truncate(job.title, 100)}
  Requirements: ${truncate(job.requirements, 500)}
  Stipend Range: ${truncate(job.stipend_range, 50)}

Candidate:
  Skills: ${candidate.skills?.join(', ') || 'Not provided'}
  Experience: ${truncate(candidate.experience, 300)}
  Availability: ${truncate(candidate.availability, 100)}
  Expected Stipend: ${truncate(candidate.expected_stipend, 50)}

Screening Responses:
${screeningSection}

Scoring Weights (apply these for overall_score calculation):
  skill_fit: 30%, startup_fit: 25%, communication_fit: 20%, salary_fit: 15%, availability_fit: 10%

Instructions:
- Score each dimension from 0 to 100
- For each dimension, provide 2-3 specific reasons citing evidence from the candidate's profile or answers
- The overall_score MUST be the weighted average: (skill_fit×0.30 + startup_fit×0.25 + communication_fit×0.20 + salary_fit×0.15 + availability_fit×0.10)
- The summary should be 2-3 sentences explaining the candidate's overall fit
- Be specific in reasons — reference actual skills, answers, or gaps`;
}

// ── Main: Score a candidate using Gemini Flash ──────────────────────────────
export async function scoreCandidate(input: AIScoreInput): Promise<AIScoreResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const prompt = buildPrompt(input);

  // Attempt with one retry on failure
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await genai.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: SCORE_RESULT_SCHEMA,
          temperature: 0.4, // Lower temperature for more consistent scoring
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Gemini returned empty response');
      }

      const result: AIScoreResult = JSON.parse(text);

      // Validate and clamp scores to 0-100 range
      result.skill_fit = clamp(result.skill_fit);
      result.communication_fit = clamp(result.communication_fit);
      result.startup_fit = clamp(result.startup_fit);
      result.availability_fit = clamp(result.availability_fit);
      result.salary_fit = clamp(result.salary_fit);
      result.overall_score = clamp(result.overall_score);

      // Ensure score_breakdown scores match top-level scores
      if (result.score_breakdown) {
        result.score_breakdown.skill_fit.score = result.skill_fit;
        result.score_breakdown.communication_fit.score = result.communication_fit;
        result.score_breakdown.startup_fit.score = result.startup_fit;
        result.score_breakdown.availability_fit.score = result.availability_fit;
        result.score_breakdown.salary_fit.score = result.salary_fit;
      }

      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[AI] Scoring attempt ${attempt + 1} failed:`, lastError.message);

      // Wait briefly before retry
      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  throw new Error(`AI scoring failed after 2 attempts: ${lastError?.message}`);
}

// ── Utility ─────────────────────────────────────────────────────────────────
function clamp(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}
