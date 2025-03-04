const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controller/blogController');

blogRouter.get("/",blogController.getBlogs);
blogRouter.get("/add-blog",blogController.getAddBlog);
blogRouter.get("/blogs/:id",blogController.getBlogDetailPage);

blogRouter.post("/add-blog",blogController.postBlogs);
//blogRouter.put("/",blogController.updateBlogs);
blogRouter.delete("/blogs/:id",blogController.deleteBlogs);



module.exports = blogRouter;