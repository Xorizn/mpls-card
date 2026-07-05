export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/** True only when both env vars are set, so the app can gracefully fall back
 *  to static defaults when Supabase has not been configured yet. */
export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_KEY.length > 0;

/** Storage bucket that holds the poster and logo uploads. */
export const ASSETS_BUCKET = "assets";
