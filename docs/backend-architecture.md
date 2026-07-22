# TalentOS — Backend Architecture Documentation

**Prepared by:** Muskan Yeshmin Ali (Backend)  
**Version:** 2.0 | **Date:** July 2026 (Mentor Feedback Update)  
**Stack:** Next.js 16 (App Router) + TypeScript + Supabase + AI Scoring

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  (Kamal — Next.js pages: dashboard, jobs, candidates)  │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP fetch()
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND API LAYER                     │
│              (Next.js App Router — /app/api/)           │
│                                                         │
│  /api/jobs           ← GET all jobs | POST create job  │
│  /api/candidates     ← GET with scores | POST add      │
│  /api/upload-resume  ← POST → Supabase Storage         │
│  /api/ai-score       ← POST → AI scorer → save score   │
│  /api/shortlist      ← GET ranked candidates           │
│  /api/n8n/webhook    ← POST from Make.com/n8n          │
│  /api/automation/    ← POST from any automation tool   │
│   webhook                                               │
└────────────┬─────────────────────────┬──────────────────┘
             │                         │
             ▼                         ▼
┌────────────────────┐    ┌────────────────────────────┐
│   SUPABASE DB      │    │      AI SCORING            │
│   (PostgreSQL)     │    │   (lib/ai.ts — Nirupama)   │
│                    │    │                            │
│  jobs              │    │  Gemini 1.5 Flash          │
│  candidates        │    │  → 5 dimension scores      │
│  responses         │    │  → summary text            │
│  scores            │    │  → score_breakdown (WHY)   │
│                    │    │                            │
│  Storage: resumes/ │    └────────────────────────────┘
└────────────────────┘

External Automation (Krrish):
  Make.com / n8n → POST /api/n8n/webhook → inserts candidate + triggers AI
```

---

## 2. Database Schema

### `jobs` table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| title | TEXT NOT NULL | Job title |
| description | TEXT | Full job description |
| requirements | TEXT | Skills/experience required |
| location | TEXT | Remote / city |
| stipend_range | TEXT | e.g. "₹15k-20k" |
| created_at | TIMESTAMPTZ | Auto-set |

### `candidates` table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| job_id | UUID (FK → jobs) | Which job they applied to |
| name | TEXT NOT NULL | Full name |
| email | TEXT NOT NULL | Contact email |
| phone | TEXT | Contact phone |
| resume_url | TEXT | Supabase Storage URL |
| skills | TEXT[] | Array of skills |
| experience | TEXT | Work experience description |
| availability | TEXT | When they can join |
| expected_stipend | TEXT | Salary expectation |
| source | TEXT | 'direct' / 'n8n' / 'automation' |
| created_at | TIMESTAMPTZ | Auto-set |

### `responses` table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| candidate_id | UUID (FK → candidates) | Linked candidate |
| question | TEXT | Screening question |
| answer | TEXT | Candidate's answer |
| created_at | TIMESTAMPTZ | Auto-set |

### `scores` table — Explainable AI
| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| candidate_id | UUID (FK → candidates) | Linked candidate |
| job_id | UUID (FK → jobs) | Which job scored for |
| skill_fit | INTEGER (0-100) | Skill match score |
| communication_fit | INTEGER (0-100) | Communication score |
| startup_fit | INTEGER (0-100) | Startup culture fit |
| availability_fit | INTEGER (0-100) | Availability match |
| salary_fit | INTEGER (0-100) | Stipend expectation fit |
| overall_score | INTEGER (0-100) | Weighted average |
| summary | TEXT | AI-generated candidate brief |
| **score_breakdown** | **JSONB** | **Explainable AI: per-dimension reasons** |
| ranked_position | INTEGER | Rank after shortlisting |
| created_at | TIMESTAMPTZ | Auto-set |

**score_breakdown shape (Explainable AI — mentor requirement):**
```json
{
  "skill_fit":         { "score": 85, "reasons": ["Python matched", "React matched", "Missing Docker"] },
  "communication_fit": { "score": 70, "reasons": ["Clear responses", "No portfolio link"] },
  "startup_fit":       { "score": 90, "reasons": ["Prefers fast-paced env", "Has prior startup exp"] },
  "availability_fit":  { "score": 100, "reasons": ["Can join immediately"] },
  "salary_fit":        { "score": 80, "reasons": ["Expected ₹18k, budget is ₹20k — within range"] }
}
```

---

## 3. Scoring Weights

| Dimension | Weight | Rationale |
|-----------|--------|-----------|
| Skill Fit | **30%** | Core technical match |
| Startup Fit | **25%** | Culture + adaptability |
| Communication Fit | **20%** | Quality of screening responses |
| Salary Fit | **15%** | Budget alignment |
| Availability Fit | **10%** | Joining timeline |

Formula:
```
overall_score = (skill_fit × 0.30) + (startup_fit × 0.25) +
                (communication_fit × 0.20) + (salary_fit × 0.15) +
                (availability_fit × 0.10)
```
Implemented in [`lib/utils.ts → computeOverallScore()`](../lib/utils.ts)

---

## 4. API Endpoints Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/jobs` | None | Fetch all jobs |
| POST | `/api/jobs` | None | Create a new job |
| GET | `/api/candidates?jobId=` | None | Fetch candidates with scores |
| POST | `/api/candidates` | None | Add a candidate directly |
| POST | `/api/upload-resume` | None | Upload resume to Supabase Storage |
| POST | `/api/ai-score` | None | Trigger AI scoring for a candidate |
| GET | `/api/shortlist?jobId=` | None | Get ranked shortlist |
| POST | `/api/n8n/webhook` | None | Automation entry point (Make.com/n8n) |

> Auth: All routes currently open (service role used server-side). Auth will be added post-MVP via Supabase Auth.

---

## 5. Automation Webhook Flow

```
Make.com / n8n
    │
    │ POST /api/n8n/webhook
    │ {
    │   name, email, phone, job_id,
    │   skills, experience, availability, expected_stipend,
    │   screening_responses: [{ question, answer }]
    │ }
    ▼
Step 1: Validate required fields (name, email, job_id)
Step 2: Insert candidate → candidates table
Step 3: Insert Q&A → responses table (linked to candidateId)
Step 4: Fetch job data from jobs table
Step 5: Call AI scorer → get scores + score_breakdown
Step 6: Upsert → scores table (with breakdown for Explainable AI)
Step 7: Return { success: true, candidateId, scoreId }
```

**Error handling:** AI scoring failure is non-fatal — webhook always returns 200 if candidate was saved. Founder can manually re-trigger scoring via `/api/ai-score`.

---

## 6. File Structure (Muskan's Responsibility)

```
app/api/
├── jobs/route.ts              ← GET all / POST create
├── candidates/route.ts        ← GET with score join / POST add
├── upload-resume/route.ts     ← Supabase Storage upload
├── ai-score/route.ts          ← AI scoring + persist
├── shortlist/route.ts         ← Ranked list + update positions
└── n8n/webhook/route.ts       ← Automation entry point

lib/
├── supabase.ts                ← supabaseClient + supabaseAdmin
├── utils.ts                   ← computeOverallScore, formatCandidate, generateRanking
└── ai.ts                      ← scoreCandidate stub (Nirupama fills this)

types/index.ts                 ← All interfaces (Job, Candidate, Score, ScoreBreakdown...)
supabase/schema.sql            ← Full DB schema + migration
docs/
├── backend-architecture.md    ← This file
├── privacy-security.md        ← Data privacy report
└── ai-cost-optimisation.md    ← AI cost reduction plan
```

---

## 7. Environment Variables

| Variable | Used By | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client (read-only) | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Bypasses RLS for writes |
| `NEXT_PUBLIC_APP_URL` | Server | Base URL for internal calls |
