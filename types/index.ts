// ============================================================
// TalentOS — TypeScript Types
// Keep in sync with supabase/schema.sql
// ============================================================

// ── Database Row Types ──────────────────────────────────────

export interface Job {
  id: string;
  title: string;
  description: string | null;
  requirements: string | null;
  location: string | null;
  stipend_range: string | null;
  created_at: string;
}

export interface Candidate {
  id: string;
  job_id: string;
  name: string;
  email: string;
  phone: string | null;
  resume_url: string | null;
  skills: string[];
  experience: string | null;
  availability: string | null;
  expected_stipend: string | null;
  /** Where this candidate came from: 'google_form' | 'direct' | 'n8n' */
  source: string;
  created_at: string;
}

export interface Response {
  id: string;
  candidate_id: string;
  question: string;
  answer: string | null;
  created_at: string;
}

export interface Score {
  id: string;
  candidate_id: string;
  job_id: string;
  skill_fit: number;           // 0-100
  communication_fit: number;   // 0-100
  startup_fit: number;         // 0-100
  availability_fit: number;    // 0-100
  salary_fit: number;          // 0-100
  overall_score: number;       // 0-100 (weighted average)
  summary: string | null;      // AI-generated brief
  ranked_position: number | null;
  created_at: string;
}

// ── Joined / Composite Types ────────────────────────────────

/** Candidate row joined with its Score — used by the ranked dashboard. */
export interface CandidateWithScore extends Candidate {
  score: Score | null;
}

// ── API Payload Types ───────────────────────────────────────

/** Shape of the JSON body n8n POSTs to /api/n8n/webhook */
export interface WebhookPayload {
  name: string;
  email: string;
  phone?: string;
  job_id: string;
  skills?: string[];
  experience?: string;
  availability?: string;
  expected_stipend?: string;
  screening_responses?: Array<{
    question: string;
    answer: string;
  }>;
}

/** Input we pass to the AI scoring function in lib/ai.ts */
export interface AIScoreInput {
  candidate: Candidate;
  job: Job;
  /** Optional screening Q&A to include in context */
  responses?: Response[];
}

/** Output the AI scoring function returns */
export interface AIScoreResult {
  skill_fit: number;         // 0-100
  communication_fit: number; // 0-100
  startup_fit: number;       // 0-100
  availability_fit: number;  // 0-100
  salary_fit: number;        // 0-100
  overall_score: number;     // 0-100 (can be overridden or computed by AI)
  summary: string;
}
