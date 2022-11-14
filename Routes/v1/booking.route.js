const express = require('express');
const router = express.Router();
const bookingController = require('../../Controllers/booking.controller');

router.route('/confirmBookings').post(bookingController.confirmOrder);
router.route('/getBookings').get(bookingController.getBooking);
router.route('/:email').get(bookingController.getBookingByMail);
router.route('/:id').delete(bookingController.deleteBooking);
module.exports = router;
