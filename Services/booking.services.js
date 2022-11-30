const { getDb } = require('../utils/dbConnection');
const ObjectId = require('mongodb').ObjectId;

module.exports.confirmBookingService = async (booking) => {
  const db = getDb();
  const result = await db.collection('bookings').insertOne(booking);
  return result;
};
module.exports.getBookingService = async () => {
  const db = getDb();
  const result = await db.collection('bookings').find({}).toArray();
  return result;
};
module.exports.getBookingByEmailService = async (email) => {
  const db = getDb();
  const result = await db
    .collection('bookings')
    .find({ Email: email })
    .toArray();
  return result;
};
module.exports.deleteBookingService = async (id) => {
  const db = getDb();
  const result = await db.collection('bookings').deleteOne({
    _id: ObjectId(id),
  });
  return result;
};
module.exports.updateBookingService = async (filter, updateDocs) => {
  const db = getDb();

  const result = await db.collection('booking').updateOne(filter, updateDocs);

  return result;
};
