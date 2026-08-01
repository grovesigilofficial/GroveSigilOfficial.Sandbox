const SUPABASE_URL = "https://izhdxcfinxzlziynbuvx.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

window.grove = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
