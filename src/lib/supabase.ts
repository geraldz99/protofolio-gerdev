import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ntyihmxifbhntwsuhpkk.supabase.co";
const supabaseAnonKey = "sb_publishable_ziABISXrTRrrxr23JVUQCw_smIw6iOm";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
