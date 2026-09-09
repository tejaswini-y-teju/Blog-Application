const express = require("express");
const Blog = require("../models/blog");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Blog API
router.post("/create", protect, async (req, res) => {
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
            author,
            userId: req.user.userId
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


// Get User's Blogs API
router.get("/", protect, async (req, res) => {
    try {
        const blogs = await Blog.find({
            userId: req.user.userId
        });

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
router.put("/:id", protect, async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const updatedBlog = await Blog.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
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
                message: "Blog not found or you are not authorized"
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
router.delete("/:id", protect, async (req, res) => {
    try {
        const deletedBlog = await Blog.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found or you are not authorized"
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