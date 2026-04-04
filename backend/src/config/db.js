const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default admin and settings on first run
    await seedDefaults();
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

const seedDefaults = async () => {
  const User = require('../models/User');
  const Settings = require('../models/Settings');

  // Create default Settings document if none exists
  const settingsCount = await Settings.countDocuments();
  if (settingsCount === 0) {
    await Settings.create({ maxBookingsPerDay: 10, reminderEnabled: true });
    console.log('⚙️  Default settings created');
  }

  // Create default admin if none exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@sharafclinic.com';
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@2024!', 12);
    await User.create({
      name: 'Admin',
      email: adminEmail,
      phone: process.env.CLINIC_PHONE || '+201008080358',
      password: hash,
      role: 'admin',
    });
    console.log(`👑 Default admin created: ${adminEmail}`);
  }
};

module.exports = connectDB;
