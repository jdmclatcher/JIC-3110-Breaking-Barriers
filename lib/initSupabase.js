import { createClient } from "@supabase/supabase-js";

let supabaseUrl;
let supabaseAnonKey;

if (process.env.NODE_ENV === "development") {
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
} else if (process.env.NODE_ENV === "production") {
  supabaseUrl = process.env.SUPABASE_URL;
  supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
