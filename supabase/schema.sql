-- ============================================================
-- TalentOS — Supabase Schema (v2 — Mentor Feedback Update)
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable uuid extension (usually already enabled on Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLE: jobs
-- Stores job postings created by founders
-- ============================================================
CREATE TABLE IF NOT EXISTS jobs (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT        NOT NULL,
  description    TEXT,
  requirements   TEXT,
  location       TEXT,
  stipend_range  TEXT,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TABLE: candidates
-- Stores applicant profiles (sourced from Google Form, automation, direct)
-- ============================================================
CREATE TABLE IF NOT EXISTS candidates (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id           UUID        NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  phone            TEXT,
  resume_url       TEXT,                     -- Supabase Storage public URL
  skills           TEXT[]      DEFAULT '{}', -- Array of skill strings
  experience       TEXT,
  availability     TEXT,
  expected_stipend TEXT,
  source           TEXT        DEFAULT 'direct', -- 'google_form' | 'direct' | 'n8n' | 'automation'
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TABLE: responses
-- Stores screening Q&A pairs from automation (Make.com / n8n)
-- ============================================================
CREATE TABLE IF NOT EXISTS responses (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID        NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  question     TEXT        NOT NULL,
  answer       TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TABLE: scores
-- Stores AI scoring results per candidate per job.
--
-- MENTOR FEEDBACK (Explainable AI):
--   score_breakdown (JSONB) stores per-dimension reasons so the
--   dashboard can show WHY a candidate scored 89/100, not just the number.
--
--   Structure:
--   {
--     "skill_fit":         { "score": 85, "reasons": ["Python matched", "React matched"] },
--     "communication_fit": { "score": 70, "reasons": ["Clear responses", "Missing portfolio"] },
--     "startup_fit":       { "score": 90, "reasons": ["Prefers fast-paced", "Has startup exp"] },
--     "availability_fit":  { "score": 100, "reasons": ["Can join immediately"] },
--     "salary_fit":        { "score": 80, "reasons": ["Expected ₹18k, budget ₹20k"] }
--   }
-- ============================================================
CREATE TABLE IF NOT EXISTS scores (
  id                  UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id        UUID    NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  job_id              UUID    NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  skill_fit           INTEGER CHECK (skill_fit BETWEEN 0 AND 100),
  communication_fit   INTEGER CHECK (communication_fit BETWEEN 0 AND 100),
  startup_fit         INTEGER CHECK (startup_fit BETWEEN 0 AND 100),
  availability_fit    INTEGER CHECK (availability_fit BETWEEN 0 AND 100),
  salary_fit          INTEGER CHECK (salary_fit BETWEEN 0 AND 100),
  overall_score       INTEGER CHECK (overall_score BETWEEN 0 AND 100),
  summary             TEXT,                -- AI-generated brief (1–3 sentences)
  score_breakdown     JSONB,               -- Explainable AI: per-dimension reasons
  ranked_position     INTEGER,             -- Nullable; assigned after ranking pass
  created_at          TIMESTAMPTZ DEFAULT now(),

  -- Prevent duplicate scoring for the same candidate+job pair
  UNIQUE (candidate_id, job_id)
);

-- ============================================================
-- MIGRATION: Add score_breakdown to existing scores table
-- Run this if the table already exists from a previous deployment
-- ============================================================
ALTER TABLE scores
  ADD COLUMN IF NOT EXISTS score_breakdown JSONB;

-- ============================================================
-- INDEXES — speed up common queries
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_candidates_job_id   ON candidates(job_id);
CREATE INDEX IF NOT EXISTS idx_responses_candidate  ON responses(candidate_id);
CREATE INDEX IF NOT EXISTS idx_scores_job_id        ON scores(job_id);
CREATE INDEX IF NOT EXISTS idx_scores_overall       ON scores(job_id, overall_score DESC);
-- GIN index for fast JSONB queries on score_breakdown
CREATE INDEX IF NOT EXISTS idx_scores_breakdown     ON scores USING GIN (score_breakdown);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- All tables locked by default; service role bypasses RLS automatically.
-- ============================================================
ALTER TABLE jobs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates  ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses   ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores      ENABLE ROW LEVEL SECURITY;

-- Full access policies (tighten after auth is added)
CREATE POLICY "allow_all_jobs"        ON jobs        FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_candidates"  ON candidates  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_responses"   ON responses   FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_scores"      ON scores      FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- STORAGE BUCKET: resumes
-- Create via Supabase Dashboard → Storage → New bucket "resumes" (Public ON)
-- ============================================================
