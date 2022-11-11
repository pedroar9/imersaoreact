import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://nurecozitosiyriqeelt.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51cmVjb3ppdG9zaXlyaXFlZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDUxMTAsImV4cCI6MTk4Mzc4MTExMH0._a-V7IJN5eNnBnEzwVBxcK3YnQIFjSg1aLSMeRGT1Y8";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}