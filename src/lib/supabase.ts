import { createClient } from '@supabase/supabase-js';

// Environment variables dengan fallback untuk production
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://fuwfnakfiykehjkklqrb.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d2ZuYWtmaXlrZWhqa2tscXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzAzNDAsImV4cCI6MjA3NTg0NjM0MH0.V1grr6bROoWO9XDUERD8hj41aMS0Q7sSMkS2JUHfi2w';

// Validasi environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Please check environment variables.');
  throw new Error('Supabase configuration is required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  USERS: 'users',
  STUDENTS: 'students',
  RUBRIC_GUIDES: 'rubric_guides'
} as const;



