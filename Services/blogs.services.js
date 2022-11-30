const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../utils/dbConnection');

exports.getBlogsService = async () => {
  const db = getDb();
  const result = await db.collection('blogs').find({}).toArray();
  return result;
};
exports.getBlogDetailService = async (blogId) => {
  const db = getDb();
  const result = await db
    .collection('blogs')
    .find({ _id: ObjectId(blogId) })
    .toArray();
  return result;
};
exports.getMyBlogService = async (email) => {
  const db = getDb();
  const result = await db.collection('blogs').find({ email: email }).toArray();
  return result;
};
exports.createBlogService = async (blog) => {
  const db = getDb();
  const result = await db.collection('blogs').insertOne(blog);
  return result;
};
