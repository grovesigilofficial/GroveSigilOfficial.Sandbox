const SUPABASE_URL = "https://izhdxcfinxzlziynbuvx.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6aGR4Y2Zpbnh6bHppeW5idXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NDcyODIsImV4cCI6MjEwMTAyMzI4Mn0.t-34zI46FOK0KAKlVx4OzyBVnYgjM-0sb6tb1OIGqGo";

const { createClient } = supabase;

const grove = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

window.grove = grove;
