import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) {
  throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// ---------------------------------------------------------------------------
// Public (anon) client — safe to use in browser / Client Components.
// Respects Row Level Security policies.
// ---------------------------------------------------------------------------
export const supabaseClient: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// ---------------------------------------------------------------------------
// Admin (service role) client — SERVER ONLY.
// Bypasses Row Level Security. NEVER expose this key to the client.
// Use exclusively inside Next.js API routes and Server Actions.
// ---------------------------------------------------------------------------
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      // Disable auto-refresh — service role tokens don't expire
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
