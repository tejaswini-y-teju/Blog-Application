const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// Create Blog API
router.post("/create", async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({
                message: "Please provide title, content and author"
            });
        }

        const newBlog = new Blog({
            title,
            content,
            author
        });

        await newBlog.save();

        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating blog",
            error: error.message
        });
    }
});

// Get All Blogs API
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();

        res.status(200).json({
            blogs: blogs
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching blogs",
            error: error.message
        });
    }
});

// Get Single Blog by ID
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json({
            blog: blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching blog",
            error: error.message
        });
    }
});
// Update Blog API
router.put("/:id", async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                author
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating blog",
            error: error.message
        });
    }
});
// Delete Blog API
router.delete("/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json({
            message: "Blog deleted successfully",
            blog: deletedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting blog",
            error: error.message
        });
    }
});
module.exports = router;