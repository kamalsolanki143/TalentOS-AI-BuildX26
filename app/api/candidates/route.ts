import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { formatCandidate } from '@/lib/utils';
import type { CandidateWithScore } from '@/types';

// ── GET /api/candidates?jobId=<uuid> ────────────────────────
// Fetches candidates for a given job, joined with their scores.
// Sorted by overall_score descending so the dashboard gets a pre-ranked list.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  // Build base query — join candidates with their scores row
  let query = supabaseAdmin
    .from('candidates')
    .select(`
      *,
      score:scores(*)
    `)
    .order('created_at', { ascending: false });

  if (jobId) {
    query = query.eq('job_id', jobId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[GET /api/candidates]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Supabase returns score as an array (one-to-many relation); normalise to single object
  const candidates = (data ?? []).map((c: Record<string, unknown>) => ({
    ...c,
    score: Array.isArray(c.score) ? (c.score[0] ?? null) : c.score,
  })) as CandidateWithScore[];

  // Sort by overall score if jobId was supplied
  if (jobId) {
    candidates.sort(
      (a, b) => (b.score?.overall_score ?? 0) - (a.score?.overall_score ?? 0)
    );
  }

  return NextResponse.json(candidates);
}

// ── POST /api/candidates ─────────────────────────────────────
// Inserts a new candidate (direct submission, not via n8n webhook).
// Body: Partial<Candidate> — name and email are required.
export async function POST(req: Request) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Basic validation
  if (!body.name || !body.email || !body.job_id) {
    return NextResponse.json(
      { error: 'name, email, and job_id are required' },
      { status: 400 }
    );
  }

  const candidate = formatCandidate(body);

  const { data, error } = await supabaseAdmin
    .from('candidates')
    .insert(candidate)
    .select()
    .single();

  if (error) {
    console.error('[POST /api/candidates]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
