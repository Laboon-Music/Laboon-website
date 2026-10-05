import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";

// Lazily created browser Supabase client. Creating it at module level would run
// during prerender (next build) and break the build when NEXT_PUBLIC_SUPABASE_*
// is not set; creating it on demand (client side only) keeps the build passing.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  const { supabaseUrl, supabaseAnonKey } = publicEnv;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY missing");
  }
  client ??= createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
