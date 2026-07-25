import { NextResponse } from 'next/server';

// Placeholder — automation webhook (Make.com / n8n alternative entry point)
export async function POST() {
  return NextResponse.json(
    { error: 'Automation webhook not yet configured' },
    { status: 501 }
  );
}
