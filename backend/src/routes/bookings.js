const express = require('express');
const router = express.Router();
const { getMyBookings, getAvailability, createBooking, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getMyBookings);
router.get('/availability/:date', getAvailability);
router.post('/', createBooking);
router.put('/:id/cancel', cancelBooking);

module.exports = router;
