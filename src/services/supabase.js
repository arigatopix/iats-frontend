import { createClient } from "@supabase/supabase-js";
export const supaBACKEND_URL = "https://scdtixmmlszivlnxwevz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZHRpeG1tbHN6aXZsbnh3ZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxOTA3NjgsImV4cCI6MjAzODc2Njc2OH0.PoirDcJf_jrStYNVgJnVegpUZ_zGAewmSu0KPJhizAA";
const supabase = createClient(supaBACKEND_URL, supabaseKey);

export default supabase;
