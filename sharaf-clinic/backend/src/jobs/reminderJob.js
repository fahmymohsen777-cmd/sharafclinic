const cron = require('node-cron');
const { supabase } = require('../config/supabase');
const { sendBookingReminder } = require('../services/whatsappService');

const startReminderJob = () => {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      // Check if reminders are enabled
      const { data: settings } = await supabase
        .from('settings')
        .select('reminder_enabled')
        .eq('id', 1)
        .single();

      if (!settings?.reminder_enabled) return;

      const now = new Date();

      // Find all unreminded confirmed bookings today (or tomorrow)
      const today = now.toISOString().split('T')[0];
      const tomorrow = new Date(now.getTime() + 86400000).toISOString().split('T')[0];

      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .in('date', [today, tomorrow])
        .eq('status', 'confirmed')
        .eq('whatsapp_reminder_sent', false);

      if (error || !bookings) return;

      for (const booking of bookings) {
        // Combine date + time into DateTime
        const [hours, minutes] = booking.time.split(':').map(Number);
        const appointmentDateTime = new Date(booking.date + 'T00:00:00');
        appointmentDateTime.setHours(hours, minutes, 0, 0);

        const diffMs = appointmentDateTime.getTime() - now.getTime();
        const diffMinutes = diffMs / 60000;

        // Send reminder if appointment is 55–65 minutes away
        if (diffMinutes >= 55 && diffMinutes <= 65) {
          const sent = await sendBookingReminder(booking);
          if (sent) {
            await supabase
              .from('bookings')
              .update({ whatsapp_reminder_sent: true })
              .eq('id', booking.id);
          }
        }
      }
    } catch (error) {
      console.error('Reminder job error:', error.message);
    }
  });

  console.log('⏰ Reminder cron job started (checks every minute)');
};

module.exports = { startReminderJob };
