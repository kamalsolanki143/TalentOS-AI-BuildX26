-- ============================================================
-- TalentOS — Supabase Schema
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
-- Stores applicant profiles (sourced from Google Form, n8n, direct)
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
  source           TEXT        DEFAULT 'direct', -- 'google_form' | 'direct' | 'n8n'
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TABLE: responses
-- Stores WhatsApp / screening Q&A pairs from n8n automation
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
-- Stores AI scoring results per candidate per job
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
  ranked_position     INTEGER,             -- Nullable; assigned after ranking pass
  created_at          TIMESTAMPTZ DEFAULT now(),

  -- Prevent duplicate scoring for the same candidate+job pair
  UNIQUE (candidate_id, job_id)
);

-- ============================================================
-- INDEXES — speed up common queries
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_candidates_job_id   ON candidates(job_id);
CREATE INDEX IF NOT EXISTS idx_responses_candidate  ON responses(candidate_id);
CREATE INDEX IF NOT EXISTS idx_scores_job_id        ON scores(job_id);
CREATE INDEX IF NOT EXISTS idx_scores_overall       ON scores(job_id, overall_score DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- All tables are locked by default; service role bypasses RLS
-- automatically, so these policies are for future anon/auth use.
-- ============================================================

ALTER TABLE jobs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates  ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses   ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores      ENABLE ROW LEVEL SECURITY;

-- Allow full access for all operations (service role key used from backend).
-- Tighten these policies once auth is added.
CREATE POLICY "allow_all_jobs"        ON jobs        FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_candidates"  ON candidates  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_responses"   ON responses   FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_scores"      ON scores      FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- STORAGE BUCKET: resumes
-- Create via Supabase Dashboard → Storage, or uncomment below
-- if using the management API via service role.
-- NOTE: Storage bucket creation is not supported in plain SQL;
--       run this separately via Supabase JS admin client or Dashboard.
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public)
--   VALUES ('resumes', 'resumes', true)
--   ON CONFLICT (id) DO NOTHING;
