import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://lbmhhgnnruiyteotpajv.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxibWhoZ25ucnVpeXRlb3RwYWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTY1MjUsImV4cCI6MjA2Nzg5MjUyNX0.LUGrsZ9JXWZJ1Yn6YKYXfJC4L-hq0P6b-4QGD5-Urx4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
