const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    maxBookingsPerDay: {
      type: Number,
      default: 10,
      min: [1, 'Must allow at least 1 booking per day'],
      max: [100, 'Cannot exceed 100 bookings per day'],
    },
    reminderEnabled: {
      type: Boolean,
      default: true,
    },
    clinicPhone: {
      type: String,
      default: '+201008080358',
    },
    availableTimeSlots: {
      type: [String],
      default: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'],
    },
    workingDays: {
      // 0=Sunday ... 6=Saturday (Friday=5 is closed)
      type: [Number],
      default: [0, 1, 2, 3, 4, 6], // Saturday(6) to Thursday(4), Friday closed
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
