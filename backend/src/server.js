require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { testConnection } = require('./config/supabase');
const { startReminderJob } = require('./jobs/reminderJob');
const { startRealtimeListener } = require('./services/realtimeListener');

const app = express();

// Test Supabase connection on startup
testConnection();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🦷 Sharaf Clinic API is running',
    database: 'Supabase PostgreSQL',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Sharaf Clinic API → http://localhost:${PORT}`);
  console.log(`🔗 Database: Supabase (${process.env.SUPABASE_URL || 'not configured'})`);
  console.log(`📋 Health: http://localhost:${PORT}/api/health\n`);
  startReminderJob();
  startRealtimeListener();
});

module.exports = app;
