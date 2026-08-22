const express = require("express");

const router = express.Router();

// Create Blog API
router.post("/create", (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({
            message: "Please provide title, content and author"
        });
    }

    res.status(201).json({
        message: "Blog created successfully",
        blog: {
            title: title,
            content: content,
            author: author
        }
    });
});

module.exports = router;