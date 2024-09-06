import { createClient } from "@supabase/supabase-js";
export const supabaseURL = "https://scdtixmmlszivlnxwevz.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
