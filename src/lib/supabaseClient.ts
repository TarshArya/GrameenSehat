import { createClient } from "@supabase/supabase-js";

// These values come from your .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
