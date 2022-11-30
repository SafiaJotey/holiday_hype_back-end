const BlogServices = require('../Services/blogs.services');

exports.getAllblogs = async (req, res) => {
  try {
    const blogs = await BlogServices.getBlogsService();
    res.status(200).send({
      status: 'success',
      message: 'successfully get all blogs',
      data: blogs,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get blogs ',
      error: error.message,
    });
  }
};

exports.getDetailsById = async (req, res) => {
  try {
    const blogs = await BlogServices.getBlogDetailService(req.params.blogId);
    res.status(200).send({
      status: 'success',
      message: 'successfully get all blogs',
      data: blogs,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get blogs ',
      error: error.message,
    });
  }
};
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await BlogServices.getMyBlogService(req.params.email);
    res.status(200).send({
      status: 'success',
      message: 'successfully get my blogs',
      data: blogs,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get my blogs ',
      error: error.message,
    });
  }
};
exports.createBlog = async (req, res) => {
  console.log(req.body);
  try {
    const blogs = await BlogServices.createBlogService(req.body);
    res.status(200).send({
      status: 'success',
      message: 'Successfully create a blog',
      data: blogs,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot create a blog ',
      error: error.message,
    });
  }
};
