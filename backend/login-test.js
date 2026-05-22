
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);



  if (error) {
    console.log("Login error:", error);
  } else {
    console.log("ACCESS TOKEN:");
    console.log(data.session.access_token);
  }
}


