import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://licurkfycbrecafifuae.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpY3Vya2Z5Y2JyZWNhZmlmdWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNzk2NjUsImV4cCI6MjAxMzY1NTY2NX0.IRBJpi4bbqdoFD35LepmbJtjgUNQvwQiGj244wloN64";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);