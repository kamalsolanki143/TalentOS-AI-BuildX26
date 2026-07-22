import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { scoreCandidate } from '@/lib/ai';
import { computeOverallScore } from '@/lib/utils';
import type { Candidate, Job, Response as ScreeningResponse } from '@/types';

// ── POST /api/ai-score ───────────────────────────────────────
// Fetches candidate + job data, calls the AI scorer, persists result.
// Body: { candidateId: string, jobId: string }
export async function POST(req: Request) {
  let body: { candidateId?: string; jobId?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { candidateId, jobId } = body;

  if (!candidateId || !jobId) {
    return NextResponse.json(
      { error: 'candidateId and jobId are required' },
      { status: 400 }
    );
  }

  // ── 1. Fetch candidate ───────────────────────────────────
  const { data: candidateData, error: candidateError } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('id', candidateId)
    .single();

  if (candidateError || !candidateData) {
    console.error('[POST /api/ai-score] candidate fetch', candidateError);
    return NextResponse.json(
      { error: candidateError?.message ?? 'Candidate not found' },
      { status: 404 }
    );
  }

  // ── 2. Fetch job ─────────────────────────────────────────
  const { data: jobData, error: jobError } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  if (jobError || !jobData) {
    console.error('[POST /api/ai-score] job fetch', jobError);
    return NextResponse.json(
      { error: jobError?.message ?? 'Job not found' },
      { status: 404 }
    );
  }

  // ── 3. Fetch screening responses (optional context) ──────
  const { data: responsesData } = await supabaseAdmin
    .from('responses')
    .select('*')
    .eq('candidate_id', candidateId);

  // ── 4. Call AI scoring ───────────────────────────────────
  let aiResult;
  try {
    aiResult = await scoreCandidate({
      candidate: candidateData as Candidate,
      job: jobData as Job,
      responses: (responsesData ?? []) as ScreeningResponse[],
    });
  } catch (aiError) {
    const message =
      aiError instanceof Error ? aiError.message : 'AI scoring failed';
    console.error('[POST /api/ai-score] AI scoring', aiError);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // ── 5. Compute overall score (use AI's value or recompute) ──
  const overallScore =
    aiResult.overall_score ?? computeOverallScore(aiResult);

  // ── 6. Upsert score into Supabase ────────────────────────
  // score_breakdown is the Explainable AI payload (mentor requirement):
  // tells the dashboard WHY a candidate got 89/100, not just the number.
  const { data: scoreData, error: scoreError } = await supabaseAdmin
    .from('scores')
    .upsert(
      {
        candidate_id: candidateId,
        job_id: jobId,
        skill_fit: aiResult.skill_fit,
        communication_fit: aiResult.communication_fit,
        startup_fit: aiResult.startup_fit,
        availability_fit: aiResult.availability_fit,
        salary_fit: aiResult.salary_fit,
        overall_score: overallScore,
        summary: aiResult.summary,
        score_breakdown: aiResult.score_breakdown ?? null,
      },
      { onConflict: 'candidate_id,job_id' } // update if already scored
    )
    .select()
    .single();

  if (scoreError) {
    console.error('[POST /api/ai-score] score upsert', scoreError);
    return NextResponse.json({ error: scoreError.message }, { status: 500 });
  }

  return NextResponse.json(scoreData, { status: 201 });
}
