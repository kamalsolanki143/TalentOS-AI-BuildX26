import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Job } from '@/types';

// ── GET /api/jobs ───────────────────────────────────────────
// Returns all jobs ordered by creation date (newest first).
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[GET /api/jobs]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Job[]);
}

// ── POST /api/jobs ──────────────────────────────────────────
// Creates a new job posting.
// Body: { title, description?, requirements?, location?, stipend_range? }
export async function POST(req: Request) {
  let body: Partial<Job>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate required field
  if (!body.title?.trim()) {
    return NextResponse.json(
      { error: 'title is required' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('jobs')
    .insert({
      title: body.title.trim(),
      description: body.description ?? null,
      requirements: body.requirements ?? null,
      location: body.location ?? null,
      stipend_range: body.stipend_range ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error('[POST /api/jobs]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Job, { status: 201 });
}
