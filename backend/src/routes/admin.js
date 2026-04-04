const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getStats,
  addBookingManually,
  updateBookingStatus,
  getSettings,
  updateSettings,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect, adminOnly);

router.get('/bookings', getAllBookings);
router.post('/bookings', addBookingManually);
router.put('/bookings/:id', updateBookingStatus);
router.get('/stats', getStats);
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

module.exports = router;
