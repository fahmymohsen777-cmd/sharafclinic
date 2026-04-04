const { supabase } = require('../config/supabase');
const { sendBookingConfirmation, sendCancellationMessage } = require('../services/whatsappService');

// GET /api/admin/bookings
const getAllBookings = async (req, res) => {
  try {
    const { date, status, page = 1, limit = 20 } = req.query;
    const from = (page - 1) * limit;
    const to = from + Number(limit) - 1;

    let query = supabase
      .from('bookings')
      .select('*, profiles(name, email, phone)', { count: 'exact' })
      .order('date', { ascending: false })
      .order('time', { ascending: true })
      .range(from, to);

    if (date) query = query.eq('date', date);
    if (status) query = query.eq('status', status);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({
      success: true,
      bookings: data,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [totalRes, todayRes, cancelledRes, completedRes, pendingRes] = await Promise.all([
      supabase.from('bookings').select('id', { count: 'exact', head: true }).neq('status', 'cancelled'),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('date', today).neq('status', 'cancelled'),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'cancelled'),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).in('status', ['pending', 'confirmed']),
    ]);

    // Monthly data (last 6 months) - raw query via RPC not needed, use simple grouping
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const { data: monthlyRaw } = await supabase
      .from('bookings')
      .select('created_at')
      .neq('status', 'cancelled')
      .gte('created_at', sixMonthsAgo.toISOString());

    // Group by month in JS
    const monthly = {};
    (monthlyRaw || []).forEach((b) => {
      const d = new Date(b.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthly[key] = (monthly[key] || 0) + 1;
    });
    const monthlyData = Object.entries(monthly).map(([month, count]) => ({ month, count }));

    res.json({
      success: true,
      stats: {
        total: totalRes.count || 0,
        todayCount: todayRes.count || 0,
        cancelled: cancelledRes.count || 0,
        completed: completedRes.count || 0,
        pending: pendingRes.count || 0,
      },
      monthlyData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/bookings — manual add
const addBookingManually = async (req, res) => {
  try {
    const { name, phone, date, time, service, notes } = req.body;

    // Check day limit
    const { data: settings } = await supabase.from('settings').select('max_bookings_per_day').eq('id', 1).single();
    const maxPerDay = settings?.max_bookings_per_day || 10;

    const { count } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('date', date)
      .neq('status', 'cancelled');

    if (count >= maxPerDay) {
      return res.status(400).json({ success: false, message: 'Day is fully booked' });
    }

    // Use admin's user_id as placeholder (since we're adding manually)
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: req.user.id,
        name,
        phone,
        date,
        time,
        service: service || 'Routine Check-up',
        notes,
        status: 'confirmed',
      })
      .select()
      .single();

    if (error) throw error;

    sendBookingConfirmation(booking).catch(console.error);
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/bookings/:id
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const { data: current } = await supabase.from('bookings').select('*').eq('id', req.params.id).single();
    if (!current) return res.status(404).json({ success: false, message: 'Booking not found' });

    const updateData = { status };
    if (status === 'cancelled' && current.status !== 'cancelled') {
      updateData.cancelled_at = new Date().toISOString();
      updateData.cancelled_by = 'admin';
    }

    const { data: updated, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (status === 'cancelled' && current.status !== 'cancelled') {
      sendCancellationMessage(updated).catch(console.error);
    }

    res.json({ success: true, booking: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/settings
const getSettings = async (req, res) => {
  try {
    const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single();
    if (error) throw error;
    res.json({ success: true, settings: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/settings
const updateSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .update(req.body)
      .eq('id', 1)
      .select()
      .single();
    if (error) throw error;
    res.json({ success: true, settings: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllBookings, getStats, addBookingManually, updateBookingStatus, getSettings, updateSettings };
