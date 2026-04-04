const { supabase } = require('../config/supabase');
const { sendBookingConfirmation, sendCancellationMessage } = require('../services/whatsappService');

// GET /api/bookings — user's own bookings
const getMyBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', req.user.id)
      .order('date', { ascending: false })
      .order('time', { ascending: true });

    if (error) throw error;
    res.json({ success: true, bookings: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/bookings/availability/:date
const getAvailability = async (req, res) => {
  try {
    const { date } = req.params;

    // Get settings
    const { data: settings } = await supabase.from('settings').select('*').eq('id', 1).single();
    const maxPerDay = settings?.max_bookings_per_day || 10;
    const allSlots = settings?.available_time_slots || ['18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'];

    // Get bookings for this date
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('time')
      .eq('date', date)
      .neq('status', 'cancelled');

    if (error) throw error;

    const bookedTimes = bookings.map((b) => b.time);
    const bookedCount = bookings.length;
    const availableSlots = maxPerDay - bookedCount;

    res.json({
      success: true,
      date,
      totalSlots: maxPerDay,
      bookedCount,
      availableSlots,
      isFullyBooked: availableSlots <= 0,
      bookedTimes,
      allTimeSlots: allSlots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/bookings — create new booking
const createBooking = async (req, res) => {
  try {
    const { date, time, service, notes, phone } = req.body;

    // Get settings
    const { data: settings } = await supabase.from('settings').select('max_bookings_per_day').eq('id', 1).single();
    const maxPerDay = settings?.max_bookings_per_day || 10;

    // Check day limit
    const { count: dayCount, error: countError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('date', date)
      .neq('status', 'cancelled');

    if (countError) throw countError;
    if (dayCount >= maxPerDay) {
      return res.status(400).json({ success: false, message: 'This day is fully booked. Please choose another date.' });
    }

    // Check time slot not already taken
    const { data: slotConflict } = await supabase
      .from('bookings')
      .select('id')
      .eq('date', date)
      .eq('time', time)
      .neq('status', 'cancelled')
      .limit(1);

    if (slotConflict && slotConflict.length > 0) {
      return res.status(400).json({ success: false, message: 'This time slot is already taken. Please choose another.' });
    }

    // Check user doesn't already have booking on this date
    const { data: userConflict } = await supabase
      .from('bookings')
      .select('id')
      .eq('date', date)
      .eq('user_id', req.user.id)
      .neq('status', 'cancelled')
      .limit(1);

    if (userConflict && userConflict.length > 0) {
      return res.status(400).json({ success: false, message: 'You already have a booking on this date.' });
    }

    // Create booking
    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        user_id: req.user.id,
        name: req.user.name,
        phone: phone || req.user.phone,
        date,
        time,
        service,
        notes,
        status: 'confirmed',
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // Send WhatsApp (non-blocking)
    sendBookingConfirmation({
      name: booking.name,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      service: booking.service,
    }).catch(console.error);

    res.status(201).json({ success: true, message: 'Appointment booked successfully!', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    // Get booking and verify ownership
    const { data: booking, error: findError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (findError || !booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }
    if (booking.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel a completed appointment' });
    }

    const { data: updated, error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString(), cancelled_by: 'user' })
      .eq('id', req.params.id)
      .select()
      .single();

    if (updateError) throw updateError;

    sendCancellationMessage(updated).catch(console.error);

    res.json({ success: true, message: 'Booking cancelled', booking: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMyBookings, getAvailability, createBooking, cancelBooking };
