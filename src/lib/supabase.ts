
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://majnotpcudebxjuxdhcz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ham5vdHBjdWRlYnhqdXhkaGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNjg0NDgsImV4cCI6MjA2NDc0NDQ0OH0.aWgdsbZk_sh0boQrnTWOaVFihthOBRs1oI4jHQRku4k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Always return true since we're using the integrated Supabase client
export const isSupabaseConfigured = () => {
  return true;
};
