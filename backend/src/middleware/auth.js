const { supabase } = require('../config/supabase');

// Verify JWT from Supabase and attach user to req
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
    }

    // Get profile (name, phone, role)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, phone, role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return res.status(401).json({ success: false, message: 'User profile not found' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: profile.name,
      phone: profile.phone,
      role: profile.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: admins only' });
  }
};

module.exports = { protect, adminOnly };
