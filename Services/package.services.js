const { getDb } = require('../utils/dbConnection');
const ObjectId = require('mongodb').ObjectId;

exports.createPackageServices = async (package) => {
  const db = getDb();

  const result = await db.collection('packages').insertOne(package);
  return result;
};
exports.getPackageServices = async () => {
  const db = getDb();

  const result = await db.collection('packages').find({}).toArray();
  return result;
};
exports.getPackageByIdServices = async (packageId) => {
  const db = getDb();

  const result = await db
    .collection('packages')
    .find({ _id: ObjectId(packageId) })
    .toArray();
  return result;
};
