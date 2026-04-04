const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    time: {
      type: String,
      required: [true, 'Appointment time is required'],
      // Format: "HH:MM" e.g. "18:00"
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      enum: [
        'Scaling & Polishing',
        'Routine Check-up',
        'Laser Teeth Whitening',
        'Fixed Prosthodontics',
        'Orthodontics',
        'Dental Fillings',
        'Dental Implants',
        'Pediatric Dentistry',
        'Other',
      ],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    whatsappConfirmationSent: {
      type: Boolean,
      default: false,
    },
    whatsappReminderSent: {
      type: Boolean,
      default: false,
    },
    cancelledAt: {
      type: Date,
    },
    cancelledBy: {
      type: String, // 'user' | 'admin'
    },
  },
  { timestamps: true }
);

// Index for efficient querying by date
bookingSchema.index({ date: 1, status: 1 });
bookingSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
