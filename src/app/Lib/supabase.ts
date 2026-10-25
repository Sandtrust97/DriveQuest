import { createClient } from "@supabase/supabase-js";

const env = (import.meta as any).env || {};

// Reemplaza estos dos valores con las credenciales de tu proyecto en Supabase (https://supabase.com)
const SUPABASE_URL = "https://ncuwuaxxrjkpfpnmfxdc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NCwxmAjkQXz5T3QPpZgl-Q_8pZo7Pdh";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
