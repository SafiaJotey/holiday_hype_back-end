const express = require('express');
const router = express.Router();
const paymentController = require('../../Controllers/payment.controller');
router.route('/:id').get(paymentController.bookingToPay);
router
  .route('/create-payment-intent')
  .post(paymentController.createPaymentIntent);

module.exports = router;
