import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// ── POST /api/upload-resume ──────────────────────────────────
// Accepts multipart/form-data with:
//   - file      : the resume file (PDF / DOCX)
//   - candidateId : the UUID of the candidate this resume belongs to
//
// Uploads to Supabase Storage bucket "resumes" at:
//   resumes/{candidateId}/{original-filename}
//
// Returns: { url: string } — the public URL of the uploaded file.
export async function POST(req: Request) {
  let formData: FormData;

  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Could not parse multipart/form-data' },
      { status: 400 }
    );
  }

  const file = formData.get('file') as File | null;
  const candidateId = formData.get('candidateId') as string | null;

  if (!file) {
    return NextResponse.json({ error: 'file field is required' }, { status: 400 });
  }
  if (!candidateId) {
    return NextResponse.json(
      { error: 'candidateId field is required' },
      { status: 400 }
    );
  }

  // Sanitise filename — replace spaces with underscores
  const safeFileName = file.name.replace(/\s+/g, '_');
  const storagePath = `${candidateId}/${safeFileName}`;

  // Convert File → ArrayBuffer → Buffer for Supabase upload
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabaseAdmin.storage
    .from('resumes')
    .upload(storagePath, buffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: true, // allow re-upload if the same filename exists
    });

  if (uploadError) {
    console.error('[POST /api/upload-resume]', uploadError);
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Build the public URL
  const { data: urlData } = supabaseAdmin.storage
    .from('resumes')
    .getPublicUrl(storagePath);

  const publicUrl = urlData?.publicUrl ?? null;

  // Optionally update the candidate row with the resume URL
  if (publicUrl) {
    await supabaseAdmin
      .from('candidates')
      .update({ resume_url: publicUrl })
      .eq('id', candidateId);
  }

  return NextResponse.json({ url: publicUrl }, { status: 201 });
}
