const { supabase } = require('../config/supabase');

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // skip email confirmation for now
    });

    if (authError) {
      return res.status(400).json({ success: false, message: authError.message });
    }

    // 2. Create profile in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: authData.user.id, name, phone, role: 'user' });

    if (profileError) {
      // Rollback auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({ success: false, message: profileError.message });
    }

    // 3. Generate token via sign-in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      return res.status(500).json({ success: false, message: signInError.message });
    }

    res.status(201).json({
      success: true,
      token: signInData.session.access_token,
      user: {
        id: authData.user.id,
        name,
        email,
        phone,
        role: 'user',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Get profile (name, phone, role)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, phone, role')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      return res.status(500).json({ success: false, message: 'Profile not found' });
    }

    res.json({
      success: true,
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profile.name,
        phone: profile.phone,
        role: profile.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

module.exports = { register, login, getMe };
