const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controller/blogController');
const isAuthenticated  = require('../middleware/authMiddleware');

blogRouter.get("/",isAuthenticated,blogController.getBlogs);
blogRouter.get("/add-blog",isAuthenticated,blogController.getAddBlog);
blogRouter.get("/blogs/:id",isAuthenticated,blogController.getBlogDetailPage);

blogRouter.post("/add-blog",isAuthenticated,blogController.postBlogs);
//blogRouter.put("/",blogController.updateBlogs);
blogRouter.delete("/blogs/:id",isAuthenticated,blogController.deleteBlogs);



module.exports = blogRouter;