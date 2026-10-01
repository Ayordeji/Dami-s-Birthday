import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cxdcpgcqzhsjullvefoq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZGNwZ2NxemhzanVsbHZlZm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NzAzOTksImV4cCI6MjEwNjM0NjM5OX0.MKHJ_GtRlBkaMEMEcbA8GaKSHHFjM9zV9b3b8zJ5wWc';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
