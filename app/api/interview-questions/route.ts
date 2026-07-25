import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateInterviewQuestions } from '@/lib/ai-questions';
import type { Candidate, Job, Score } from '@/types';

// ── POST /api/interview-questions ────────────────────────────
// On-demand interview question generation for a scored candidate.
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
    console.error('[POST /api/interview-questions] candidate fetch', candidateError);
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
    console.error('[POST /api/interview-questions] job fetch', jobError);
    return NextResponse.json(
      { error: jobError?.message ?? 'Job not found' },
      { status: 404 }
    );
  }

  // ── 3. Fetch existing score (optional, enriches questions) ──
  const { data: scoreData } = await supabaseAdmin
    .from('scores')
    .select('*')
    .eq('candidate_id', candidateId)
    .eq('job_id', jobId)
    .single();

  // ── 4. Generate questions via AI ─────────────────────────
  try {
    const result = await generateInterviewQuestions({
      candidate: candidateData as Candidate,
      job: jobData as Job,
      score: (scoreData as Score) ?? null,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (aiError) {
    const message =
      aiError instanceof Error ? aiError.message : 'Question generation failed';
    console.error('[POST /api/interview-questions] AI error', aiError);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
