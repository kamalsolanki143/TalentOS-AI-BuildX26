import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { scoreCandidate } from '@/lib/ai';
import { formatCandidate, computeOverallScore } from '@/lib/utils';
import type {
  WebhookPayload,
  Candidate,
  Job,
  Response as ScreeningResponse,
} from '@/types';

// ── POST /api/n8n/webhook ────────────────────────────────────
// Called by n8n automation after WhatsApp screening is complete.
//
// Expected payload:
// {
//   "name": string,
//   "email": string,
//   "phone"?: string,
//   "job_id": string,
//   "skills"?: string[],
//   "experience"?: string,
//   "availability"?: string,
//   "expected_stipend"?: string,
//   "screening_responses"?: [{ "question": string, "answer": string }]
// }
//
// Returns: { success: true, candidateId: string, scoreId: string | null }
export async function POST(req: Request) {
  let payload: WebhookPayload;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // ── Step 1: Validate required fields ────────────────────
  const missing: string[] = [];
  if (!payload.name?.trim())  missing.push('name');
  if (!payload.email?.trim()) missing.push('email');
  if (!payload.job_id?.trim()) missing.push('job_id');

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 }
    );
  }

  // ── Step 2: Normalise and insert candidate ───────────────
  const candidatePayload = formatCandidate({
    ...payload,
    source: 'n8n', // always mark as n8n-sourced
  });

  const { data: candidateData, error: candidateError } = await supabaseAdmin
    .from('candidates')
    .insert(candidatePayload)
    .select()
    .single();

  if (candidateError || !candidateData) {
    console.error('[POST /api/n8n/webhook] candidate insert', candidateError);
    return NextResponse.json(
      { error: candidateError?.message ?? 'Failed to create candidate' },
      { status: 500 }
    );
  }

  const candidateId: string = candidateData.id;

  // ── Step 3: Insert screening responses ───────────────────
  const screeningResponses = payload.screening_responses ?? [];

  if (screeningResponses.length > 0) {
    const responseRows = screeningResponses.map((r) => ({
      candidate_id: candidateId,
      question: r.question,
      answer: r.answer,
    }));

    const { error: responseError } = await supabaseAdmin
      .from('responses')
      .insert(responseRows);

    if (responseError) {
      // Log but don't fail — candidate was already saved
      console.warn(
        '[POST /api/n8n/webhook] responses insert (non-fatal)',
        responseError
      );
    }
  }

  // ── Step 4: Trigger AI scoring ───────────────────────────
  // Fetch the job record so the AI scorer has full context
  const { data: jobData } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .eq('id', payload.job_id.trim())
    .single();

  let scoreId: string | null = null;

  if (jobData) {
    try {
      // Fetch the responses we just inserted for AI context
      const { data: responsesFetched } = await supabaseAdmin
        .from('responses')
        .select('*')
        .eq('candidate_id', candidateId);

      const aiResult = await scoreCandidate({
        candidate: candidateData as Candidate,
        job: jobData as Job,
        responses: (responsesFetched ?? []) as ScreeningResponse[],
      });

      const overallScore =
        aiResult.overall_score ?? computeOverallScore(aiResult);

      const { data: scoreData, error: scoreError } = await supabaseAdmin
        .from('scores')
        .upsert(
          {
            candidate_id: candidateId,
            job_id: payload.job_id.trim(),
            skill_fit: aiResult.skill_fit,
            communication_fit: aiResult.communication_fit,
            startup_fit: aiResult.startup_fit,
            availability_fit: aiResult.availability_fit,
            salary_fit: aiResult.salary_fit,
            overall_score: overallScore,
            summary: aiResult.summary,
            score_breakdown: aiResult.score_breakdown ?? null, // Explainable AI
          },
          { onConflict: 'candidate_id,job_id' }
        )
        .select('id')
        .single();

      if (scoreError) {
        console.warn(
          '[POST /api/n8n/webhook] score upsert (non-fatal)',
          scoreError
        );
      } else {
        scoreId = scoreData?.id ?? null;
      }
    } catch (aiError) {
      // AI scoring failure must not block the webhook response.
      // The score can be triggered manually via /api/ai-score later.
      console.warn(
        '[POST /api/n8n/webhook] AI scoring skipped (non-fatal):',
        aiError instanceof Error ? aiError.message : aiError
      );
    }
  } else {
    console.warn(
      `[POST /api/n8n/webhook] Job ${payload.job_id} not found — skipping AI scoring`
    );
  }

  // ── Step 5: Return success ───────────────────────────────
  return NextResponse.json(
    {
      success: true,
      candidateId,
      scoreId,
    },
    { status: 200 }
  );
}
