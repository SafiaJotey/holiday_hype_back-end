const { getDb } = require('../utils/dbConnection');

exports.createPackageServices = async (package) => {
  const db = getDb();
  const result = await db.collection('packages').insertOne(package);
  return result;
};
