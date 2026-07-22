# TalentOS — Privacy & Security Report

**Prepared by:** Muskan Yeshmin Ali (Backend)  
**Version:** 1.0 | **Date:** July 2026  
**Project:** TalentOS — AI Hiring Co-Pilot for Early-Stage Founders

---

## 1. Overview

TalentOS handles sensitive personal data including candidate profiles, resumes, screening answers, and AI-generated scores. This document explains exactly how that data is stored, protected, and used — in line with mentor feedback on data transparency.

---

## 2. Data We Collect

| Data Type | Source | Stored In |
|-----------|--------|-----------|
| Candidate name, email, phone | Application form / automation | Supabase `candidates` table |
| Skills, experience, availability | Application form / automation | Supabase `candidates` table |
| Expected stipend | Application form | Supabase `candidates` table |
| Resume file (PDF/DOCX) | File upload | Supabase Storage (`resumes/` bucket) |
| Screening Q&A answers | WhatsApp / automation flow | Supabase `responses` table |
| AI scores & summaries | AI scoring engine | Supabase `scores` table |
| Job postings | Founder creates via dashboard | Supabase `jobs` table |

---

## 3. How Data Is Stored Securely

### 3.1 Database — Supabase (PostgreSQL)

- All data is stored in **Supabase**, which runs on AWS infrastructure with SOC 2 Type II compliance.
- **Row Level Security (RLS)** is enabled on all 4 tables: `jobs`, `candidates`, `responses`, `scores`.
- The backend uses a **service role key** (server-side only) for writes — this key is never exposed to the browser.
- The **anon key** (client-safe) is used only for read operations and respects RLS policies.
- Database connections use **TLS 1.2+** encryption in transit.
- Data at rest is encrypted using **AES-256** (managed by Supabase/AWS).

### 3.2 Resume Storage — Supabase Storage

- Resumes are stored in a dedicated **`resumes/`** bucket.
- File paths follow the pattern: `resumes/{candidateId}/{filename}` — candidates cannot access each other's files.
- File uploads go directly to Supabase Storage via the backend — the frontend never handles raw file bytes.

### 3.3 API Security

- All API routes are **server-side only** (Next.js App Router). No sensitive logic runs in the browser.
- The `SUPABASE_SERVICE_ROLE_KEY` is stored only in `.env.local` and never committed to Git (`.gitignore` enforced).
- Environment variables are never returned in any API response.

---

## 4. Data Usage Policy

| Principle | Implementation |
|-----------|---------------|
| **Purpose limitation** | Candidate data is used only for recruitment evaluation for the specific job applied to |
| **No third-party sharing** | Candidate data is not sold, shared, or sent to any third party (excluding Supabase infrastructure and AI API for scoring) |
| **AI usage** | Candidate profile is sent to AI model (Gemini/OpenAI) only for scoring; the AI does not retain training data from API calls |
| **Founder access only** | Only the hiring founder (authenticated user) can view candidate data for their jobs |
| **Data minimisation** | We only collect fields required for evaluation — no social profiles, no unnecessary data |

---

## 5. Data Retention

| Data | Retention Policy |
|------|-----------------|
| Candidate profiles | Retained until the job is closed or the founder deletes them |
| Resumes | Stored in Supabase Storage; deleted when candidate record is deleted (CASCADE) |
| Screening responses | Deleted with candidate record (ON DELETE CASCADE) |
| AI scores | Deleted with candidate record (ON DELETE CASCADE) |

> **Cascade deletes** are enforced at the database level — deleting a candidate automatically removes all linked responses, scores, and can be extended to storage cleanup via a Supabase Edge Function.

---

## 6. Compliance & Standards

| Standard | Status |
|----------|--------|
| Data encrypted in transit (TLS) | ✅ Enforced by Supabase |
| Data encrypted at rest (AES-256) | ✅ Enforced by Supabase/AWS |
| RLS enabled on all tables | ✅ Implemented |
| Service role key server-side only | ✅ Implemented |
| No PII in Git history | ✅ `.env.local` gitignored |
| GDPR-aligned data minimisation | ✅ Only necessary fields collected |

---

## 7. Future Security Improvements (Post-MVP)

- [ ] Add **Founder authentication** (Supabase Auth / Clerk) and tighten RLS policies so founders only see their own jobs/candidates
- [ ] Add **candidate consent** checkbox on the application form
- [ ] Implement a **data deletion endpoint** so candidates can request removal
- [ ] Add **audit logging** — track who accessed which candidate record and when
- [ ] Move AI API calls behind a **rate limiter** to prevent abuse
