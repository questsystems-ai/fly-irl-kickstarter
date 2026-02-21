import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Service role bypasses RLS (server only)
export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
