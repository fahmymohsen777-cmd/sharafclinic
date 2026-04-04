import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iucvxmcqhweedrlzuxjd.supabase.co';
const supabaseKey = 'sb_publishable_zb_-peWZ4sF0DVBD-aZLsA_NhugF_06';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Creating admin account...');
  
  // 1. Sign up the admin
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: 'admin@admin.com',
    password: 'admin123', // Minimum 6 chars for Supabase
  });

  let userId = authData?.user?.id;

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log('Account exists, elevating to admin...');
      const { data: signInData } = await supabase.auth.signInWithPassword({
        email: 'admin@admin.com',
        password: 'admin123'
      });
      userId = signInData?.user?.id;
    } else {
      console.error('Error:', authError.message);
      return;
    }
  }

  // 2. Set profile as Admin
  if (userId) {
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: userId,
      name: 'Admin',
      phone: '000000',
      role: 'admin'
    });

    if (profileError) {
      console.error('Profile Error:', profileError);
    } else {
      console.log('SUCCESS: Admin account "admin@admin.com" with password "admin123" is ready!');
    }
  }
}

run();
