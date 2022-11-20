const paymentServices = require('../Services/payment.services');

exports.bookingToPay = async (req, res) => {
  try {
    const result = await paymentServices.bookingtoPayServices(
      req.params.packageId
    );

    res.status(200).send({
      status: 'success',
      message: ' Successfully get  package by id',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get package',
      error: error.message,
    });
  }
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const paymentInfo = req.body;
    const amount = paymentInfo.price * 100;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await paymentServices.createPaymentIntentService(
      amount
    );
    res.send({
      status: 'success',
      message: 'successfully create the payment intent ',
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannotcreate payment intent',
      error: error.message,
    });
  }
};
