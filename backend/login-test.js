
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    // email: "akshat.sinha.0503@gmail.com",
    email: "devilkingh6202@gmail.com",
    password: "Akshatsinha@18"
  });




