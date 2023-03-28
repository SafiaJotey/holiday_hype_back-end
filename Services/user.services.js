const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { getDb } = require('../utils/dbConnection');
const ObjectId = require('mongodb').ObjectId;
exports.getUserServices = async (bookingId) => {
  const db = getDb();
  // console.log(bookingId);

  const result = await db
    .collection('bookings')
    .find({ _id: ObjectId(bookingId) })
    .toArray();
  return result;
};
exports.currentUserService = async (email) => {
  // console.log(email);
  const db = getDb();

  const result = await db.collection('users').find({ email: email }).toArray();
  // console.log(result);
  return result;
};

exports.createUserService = async (userInfo) => {
  const db = getDb();
  const user = getUserServices(userInfo.email);
  if (user) {
  }
  const result = await db.collection('users').insertOne(userInfo);
  return result;
};

exports.updateUserService = async (filter, updateDocs) => {
  const db = getDb();

  const result = await db.collection('users').updateMany(filter, updateDocs);

  return result;
};
