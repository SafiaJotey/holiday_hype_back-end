const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { getDb } = require('../utils/dbConnection');
const ObjectId = require('mongodb').ObjectId;
exports.bookingtoPayServices = async (bookingId) => {
  const db = getDb();
  console.log(bookingId);

  const result = await db
    .collection('bookings')
    .find({ _id: ObjectId(bookingId) })
    .toArray();
  return result;
};

exports.createPaymentIntentService = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  return paymentIntent;
};
