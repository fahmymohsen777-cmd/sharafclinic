const { createClient } = require('@supabase/supabase-js');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

// Service role client (backend-only) — bypasses RLS, full access
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const testConnection = async () => {
  const { error } = await supabase.from('settings').select('id').limit(1);
  if (error && error.code !== 'PGRST116') {
    // PGRST116 = table empty, that's fine
    console.error('❌ Supabase connection error:', error.message);
    console.error('   → Make sure you ran the SQL schema in Supabase SQL Editor');
  } else {
    console.log('✅ Supabase connected:', process.env.SUPABASE_URL);
  }
};

module.exports = { supabase, testConnection };
