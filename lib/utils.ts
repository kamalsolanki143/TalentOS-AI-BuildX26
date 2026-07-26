import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Candidate, CandidateWithScore, Score } from '@/types';

/**
 * Utility to merge Tailwind classes cleanly with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================
// Scoring weights — must sum to 1.0
// ============================================================
const WEIGHTS = {
  skill_fit: 0.30,
  communication_fit: 0.20,
  startup_fit: 0.25,
  availability_fit: 0.10,
  salary_fit: 0.15,
} as const;

/**
 * Compute the weighted overall score from individual dimension scores.
 * Missing dimensions default to 0.
 */
export function computeOverallScore(scores: Partial<Score>): number {
  const weighted =
    (scores.skill_fit ?? 0) * WEIGHTS.skill_fit +
    (scores.communication_fit ?? 0) * WEIGHTS.communication_fit +
    (scores.startup_fit ?? 0) * WEIGHTS.startup_fit +
    (scores.availability_fit ?? 0) * WEIGHTS.availability_fit +
    (scores.salary_fit ?? 0) * WEIGHTS.salary_fit;

  // Round to nearest integer and clamp within [0, 100]
  return Math.min(100, Math.max(0, Math.round(weighted)));
}

/**
 * Normalise raw incoming data (from webhook body or a Google Form) into
 * a partial Candidate shape that can be safely inserted into Supabase.
 *
 * Handles type coercion, whitespace trimming, and skills parsing.
 */
export function formatCandidate(raw: Record<string, unknown>): Partial<Candidate> {
  // skills might arrive as a comma-separated string or already an array
  let skills: string[] = [];
  if (Array.isArray(raw.skills)) {
    skills = (raw.skills as unknown[]).map((s) => String(s).trim()).filter(Boolean);
  } else if (typeof raw.skills === 'string' && raw.skills.trim()) {
    skills = raw.skills.split(',').map((s) => s.trim()).filter(Boolean);
  }

  return {
    job_id: typeof raw.job_id === 'string' ? raw.job_id.trim() : undefined,
    name: typeof raw.name === 'string' ? raw.name.trim() : undefined,
    email: typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : undefined,
    phone: typeof raw.phone === 'string' ? raw.phone.trim() : null,
    resume_url: typeof raw.resume_url === 'string' ? raw.resume_url.trim() : null,
    skills,
    experience: typeof raw.experience === 'string' ? raw.experience.trim() : null,
    availability: typeof raw.availability === 'string' ? raw.availability.trim() : null,
    expected_stipend:
      typeof raw.expected_stipend === 'string' ? raw.expected_stipend.trim() : null,
    source:
      typeof raw.source === 'string' ? raw.source.trim() : 'direct',
  };
}

/**
 * Sort candidates by overall_score descending and assign a 1-based
 * ranked_position to each.  Returns a new array — the originals are not mutated.
 */
export function generateRanking(
  candidates: CandidateWithScore[]
): CandidateWithScore[] {
  const sorted = [...candidates].sort((a, b) => {
    const scoreA = a.score?.overall_score ?? 0;
    const scoreB = b.score?.overall_score ?? 0;
    return scoreB - scoreA;
  });

  return sorted.map((candidate, index) => ({
    ...candidate,
    score: candidate.score
      ? { ...candidate.score, ranked_position: index + 1 }
      : null,
  }));
}
