# TalentOS — AI Cost Optimisation Plan

**Prepared by:** Muskan Yeshmin Ali (Backend)  
**Version:** 1.0 | **Date:** July 2026  
**Mentor Requirement:** Reduce AI operating costs while maintaining scoring quality

---

## 1. Problem

Calling GPT-4o or Gemini Pro for every candidate evaluation is expensive. At scale:

| Scenario | Cost Estimate |
|----------|--------------|
| 100 candidates/month × GPT-4o (~$0.01/call) | ~$1/month |
| 1,000 candidates/month | ~$10/month |
| 10,000 candidates/month | ~$100/month |

For an early-stage startup tool, costs must stay near **zero** during the MVP phase.

---

## 2. Strategy 1 — Use Gemini Flash (Not Pro)

**Recommended model:** `gemini-1.5-flash` (or `gemini-2.0-flash`)

| Model | Cost per 1M tokens | Speed | Quality |
|-------|-------------------|-------|---------|
| GPT-4o | ~$5 input / $15 output | Slow | High |
| Gemini 1.5 Pro | ~$3.5 input / $10.5 output | Medium | High |
| **Gemini 1.5 Flash** | **~$0.075 input / $0.30 output** | Fast | Good enough |
| Gemini 2.0 Flash | ~$0.10 input / $0.40 output | Very fast | Good |

**Savings: ~97% cost reduction** vs GPT-4o for the same task.

Gemini Flash is sufficient for structured candidate evaluation because:
- The output is always a fixed JSON schema (no creative generation needed)
- The evaluation rubric is predefined — the model just needs to apply it
- We can validate and clamp outputs in code, correcting minor inaccuracies

---

## 3. Strategy 2 — Prompt Token Optimisation

Instead of sending the full candidate object, send only the fields the AI actually needs:

```
// ❌ Bad — wastes tokens
const prompt = `Evaluate this candidate: ${JSON.stringify(candidate)}`

// ✅ Good — only relevant fields
const prompt = `
Job: ${job.title} | Requirements: ${job.requirements} | Budget: ${job.stipend_range}
Candidate Skills: ${candidate.skills.join(', ')}
Experience: ${candidate.experience}
Availability: ${candidate.availability}
Expected Stipend: ${candidate.expected_stipend}
Screening Answers: ${responses.map(r => `Q: ${r.question} A: ${r.answer}`).join(' | ')}
`
```

**Savings:** ~40-60% token reduction per call.

---

## 4. Strategy 3 — Cache Results (Already Implemented)

The `ai-score` route already uses **upsert with `onConflict: 'candidate_id,job_id'`**.

This means:
- A candidate is **never scored twice** for the same job
- Re-fetching the shortlist does **not** trigger new AI calls
- Scores persist in Supabase and are reused across all dashboard requests

**Savings:** 100% cost reduction on repeated evaluations.

---

## 5. Strategy 4 — Score Only When Needed

Current flow triggers scoring immediately on candidate submission. Future optimisation:

```
Option A (current MVP): Score immediately on webhook → fast but calls AI every time
Option B (batched):     Queue candidates → score in batch once per hour
Option C (on-demand):   Only score when founder opens candidate dashboard
```

**Recommended for MVP:** Keep Option A but add a check — if a score already exists and is <24h old, skip re-scoring.

---

## 6. Strategy 5 — Structured Output (No Output Parsing Waste)

Ask the AI for strict JSON with `response_mime_type: "application/json"` (Gemini) or `response_format: { type: "json_object" }` (OpenAI).

This eliminates:
- Output tokens wasted on markdown formatting
- Client-side parsing failures
- Retry calls due to malformed output

**Savings:** ~15-20% output token reduction.

---

## 7. Estimated Monthly Cost at MVP Scale

Using **Gemini 1.5 Flash** + prompt optimisation + caching:

| Metric | Value |
|--------|-------|
| Avg tokens per evaluation | ~600 input + ~200 output |
| Cost per evaluation | ~$0.0001 |
| 500 candidates/month | **~$0.05/month** |
| 5,000 candidates/month | **~$0.50/month** |

This is effectively **free** at hackathon and early startup scale.

---

## 8. Implementation Checklist for Nirupama (AI Teammate)

- [ ] Use `gemini-1.5-flash` as the default model
- [ ] Send only required fields in the prompt (see Strategy 2)
- [ ] Request `response_mime_type: "application/json"` for structured output
- [ ] Do not add retry logic that calls the API more than twice per candidate
- [ ] The upsert/cache is already handled in the backend — do not add your own caching layer
