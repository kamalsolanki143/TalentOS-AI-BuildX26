import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateRanking } from '@/lib/utils';
import type { CandidateWithScore } from '@/types';

// ── GET /api/shortlist?jobId=<uuid> ─────────────────────────
// Returns the ranked shortlist of candidates for a given job.
//
// Steps:
//   1. Fetch candidates + scores for jobId
//   2. Sort by overall_score descending (via generateRanking)
//   3. Persist ranked_position back to the scores table
//   4. Return the ranked array
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json(
      { error: 'jobId query parameter is required' },
      { status: 400 }
    );
  }

  // ── 1. Fetch candidates with scores ─────────────────────
  const { data, error } = await supabaseAdmin
    .from('candidates')
    .select(`
      *,
      score:scores(*)
    `)
    .eq('job_id', jobId);

  if (error) {
    console.error('[GET /api/shortlist]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Normalise score from array → single object
  const candidates = (data ?? []).map((c: Record<string, unknown>) => ({
    ...c,
    score: Array.isArray(c.score) ? (c.score[0] ?? null) : c.score,
  })) as CandidateWithScore[];

  // ── 2. Rank candidates ───────────────────────────────────
  const ranked = generateRanking(candidates);

  // ── 3. Persist ranked_position back to Supabase ─────────
  // Run all updates in parallel for speed
  await Promise.all(
    ranked.map((candidate) => {
      if (!candidate.score?.id) return Promise.resolve();
      return supabaseAdmin
        .from('scores')
        .update({ ranked_position: candidate.score.ranked_position })
        .eq('id', candidate.score.id);
    })
  );

  return NextResponse.json(ranked);
}
