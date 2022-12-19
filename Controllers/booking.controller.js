const BookingServices = require('../Services/booking.services');
const ObjectId = require('mongodb').ObjectId;

exports.confirmOrder = async (req, res) => {
  try {
    const booking = await BookingServices.confirmBookingService(req.body);
    res.status(200).send({
      status: 'success',
      message: 'order confirmed',
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'order is not confirmed',
      error: error.message,
    });
  }
};
exports.getBooking = async (req, res) => {
  try {
    const bookings = await BookingServices.getBookingService();
    res.status(200).send({
      status: 'success',
      message: 'success full get all bookings',
      data: bookings,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get all bookings',
      error: error.message,
    });
  }
};
exports.getBookingByMail = async (req, res) => {
  try {
    const booking = await BookingServices.getBookingByEmailService(
      req.params.email
    );
    res.status(200).send({
      status: 'success',
      message: 'successfully get a booking by email',
      data: booking,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get a booking by email',
      error: error.message,
    });
  }
};
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await BookingServices.deleteBookingService(req.params.id);
    res.status(200).send({
      status: 'success',
      message: 'successfully delete a booking ',
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot delete a booking ',
      error: error.message,
    });
  }
};
exports.updateBooking = async (req, res) => {
  try {
    // console.log(req.params.id, req.body);
    const id = req.params.id;
    const payment = req.body;
    const filter = { _id: ObjectId(id) };
    const updateDocs = {
      $set: {
        payment: payment,
      },
    };
    const booking = await BookingServices.updateBookingService(
      filter,
      updateDocs
    );
    res.status(200).send({
      status: 'success',
      message: 'successfully update a booking ',
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot update a booking ',
      error: error.message,
    });
  }
};
