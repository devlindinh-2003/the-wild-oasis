import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://icgaksqkujdjbsajbare.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2Frc3FrdWpkamJzYWpiYXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2Mzg5MDUsImV4cCI6MjAxNjIxNDkwNX0.fbBF-E_sMhNyXAwp6gxdSCJXl4OWVc_WnLoOf7I97fM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
