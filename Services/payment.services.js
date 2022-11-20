const stripe = require('stripe')(process.env.STRIPE_SECRET);
exports.bookingtoPayServices = async (bookingId) => {
  const db = getDb();

  const result = await db
    .collection('bookings')
    .findOne({ _id: ObjectId(bookingId) })
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
