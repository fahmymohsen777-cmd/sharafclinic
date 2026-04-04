const { supabase } = require('../config/supabase');
const { sendBookingConfirmation, sendCancellationMessage } = require('./whatsappService');

const startRealtimeListener = () => {
  console.log('🎧 Starting Supabase Realtime Listener for bookings table...');

  supabase
    .channel('bookings-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'bookings' },
      async (payload) => {
        console.log('🆕 New booking detected via Realtime:', payload.new.id);
        if (payload.new.status !== 'cancelled') {
           // Small delay to ensure DB confirms and prevents overlaps
           setTimeout(async () => {
              await sendBookingConfirmation({
                name: payload.new.name,
                phone: payload.new.phone,
                date: payload.new.date,
                time: payload.new.time,
                service: payload.new.service
              }).catch(console.error);
           }, 1000);
        }
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'bookings' },
      async (payload) => {
        const oldStatus = payload.old.status;
        const newStatus = payload.new.status;
        
        if (newStatus === 'cancelled' && oldStatus !== 'cancelled') {
           console.log('🔄 Booking cancelled detected via Realtime:', payload.new.id);
           await sendCancellationMessage({
             name: payload.new.name,
             phone: payload.new.phone,
             date: payload.new.date,
             time: payload.new.time
           }).catch(console.error);
        }
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
         console.log('✅ Successfully subscribed to Supabase Realtime for bookings!');
      }
    });
};

module.exports = { startRealtimeListener };
