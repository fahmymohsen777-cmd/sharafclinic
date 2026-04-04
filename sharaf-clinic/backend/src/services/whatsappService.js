const twilio = require('twilio');

let client = null;

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
  try {
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('📱 Twilio WhatsApp client initialized');
  } catch (e) {
    console.warn('⚠️  Twilio init failed:', e.message);
  }
} else {
  console.warn('⚠️  WhatsApp disabled: set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env');
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const sendWhatsApp = async (to, message) => {
  if (!client) {
    console.log(`[Message Skipped] To: ${to}\nMessage: ${message}`);
    return false;
  }

  try {
    // Normalize phone number
    let phone = to.replace(/\s/g, '');
    if (!phone.startsWith('+')) phone = '+2' + phone; // Default country Egypt

    // Check if admin prefers SMS over WhatsApp from .env
    const preferSMS = process.env.PREFER_SMS === 'true';
    
    const messageTo = preferSMS ? phone : `whatsapp:${phone}`;
    const messageFrom = preferSMS 
      ? (process.env.TWILIO_SMS_FROM || process.env.TWILIO_PHONE_NUMBER) // Twilio normal number
      : (process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'); // Twilio WA number

    await client.messages.create({
      from: messageFrom,
      to: messageTo,
      body: message,
    });
    
    console.log(`✅ ${preferSMS ? 'SMS' : 'WhatsApp'} sent to ${phone}`);
    return true;
  } catch (error) {
    console.error(`❌ Message failed for ${to}:`, error.message);
    return false;
  }
};

const sendBookingConfirmation = async (booking) => {
  const message = `🦷 *Sharaf Dental Clinic*\n\nYour appointment is confirmed!\n\n📅 Date: ${formatDate(booking.date)}\n⏰ Time: ${booking.time}\n💊 Service: ${booking.service}\n\nPlease arrive 10 minutes early.\n📞 For inquiries: ${process.env.CLINIC_PHONE}\n\nThank you, ${booking.name}! 😊`;
  return sendWhatsApp(booking.phone, message);
};

const sendBookingReminder = async (booking) => {
  const message = `⏰ *Reminder* — Sharaf Dental Clinic\n\nHi ${booking.name}, your appointment is in *1 hour*!\n\n📅 ${formatDate(booking.date)} at ${booking.time}\n💊 ${booking.service}\n\nSee you soon! 🦷`;
  return sendWhatsApp(booking.phone, message);
};

const sendCancellationMessage = async (booking) => {
  const message = `❌ *Sharaf Dental Clinic*\n\nYour appointment on ${formatDate(booking.date)} at ${booking.time} has been cancelled.\n\nTo rebook, visit our website or call: ${process.env.CLINIC_PHONE}`;
  return sendWhatsApp(booking.phone, message);
};

module.exports = { sendBookingConfirmation, sendBookingReminder, sendCancellationMessage };
