import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yvrrehfcdvkrdbqhuwqu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cnJlaGZjZHZrcmRicWh1d3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzM2MDEsImV4cCI6MjA0OTU0OTYwMX0.Ap3woy5SCoJbxBToiUnqpd5avxI7WUWOlj6uNmt9M5E';

export const supabase = createClient(supabaseUrl, supabaseKey);


