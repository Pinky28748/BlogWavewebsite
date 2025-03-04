const Blog = require('../model/Blog');

exports.getBlogs = async (req,res) => {
    try
    {
        const blogs = await Blog.find();
        return res.render("home",{ blogs});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send('An error occured while fetching blogs');
    }
}

exports.getAddBlog = async (req,res) => {
    return res.render("add-blog");
}

exports.getBlogDetailPage = async (req,res) => {
    try
    {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if(!blog)
        {
            return res.status(404).send("Blog not found");
        }
        console.log("Blog details",blog);
        res.render("blogDetails",{blog});


    }
    catch(err)
    {
        console.log(err);
        return res.status(500).send("Server error");
    }
}
exports.postBlogs = async (req,res) => {
    const {title,content,image_url} = req.body;
    if(!title || !content || !image_url)
    {
        return res.status(400).json({message : "Details not found"});
    }
    try
    {
        const newBlog = new Blog({
            title,content,image_url
        })
        await newBlog.save();
        return res.redirect("/")
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send('An error occured while posting blogs');
    }
}

exports.deleteBlogs = async (req,res) => {
    try {
        const blogId = req.params.id;
        await Blog.findByIdAndDelete(blogId);
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ success: false, message: "Failed to delete blog" });
    }
}
