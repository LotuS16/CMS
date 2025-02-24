import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olupukupsuudviumjakq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sdXB1a3Vwc3V1ZHZpdW1qYWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNzg2NDYsImV4cCI6MjA1NDk1NDY0Nn0.cia2tjIo4qF8-i9z-3f97t2a-ZDReff5JaOJBLQifiY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
    },
  });
