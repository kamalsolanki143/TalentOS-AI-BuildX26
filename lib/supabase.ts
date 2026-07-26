import { createClient, SupabaseClient } from '@supabase/supabase-js';

// TODO: Replace DemoAuth with Supabase Auth before production.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-demo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// ---------------------------------------------------------------------------
// Public (anon) client — Safe fallback for demo mode without env vars
// ---------------------------------------------------------------------------
export const supabaseClient: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// ---------------------------------------------------------------------------
// Admin (service role) client — Safe fallback for demo mode without env vars
// ---------------------------------------------------------------------------
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
