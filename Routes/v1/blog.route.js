const express = require('express');
const router = express.Router();
const blogsController = require('../../Controllers/blogs.controller');
router.route('/').get(blogsController.getAllblogs);
router.route('/:blogId').get(blogsController.getDetailsById);
router.route('/myBlog/:email').get(blogsController.getMyBlogs);
router.route('/addBlog').post(blogsController.createBlog);
module.exports = router;
