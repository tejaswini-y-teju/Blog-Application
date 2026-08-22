const express = require("express");

const router = express.Router();

// User Registration API
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide name, email and password"
        });
    }

    res.status(201).json({
        message: "User registered successfully",
        user: {
            name: name,
            email: email
        }
    });
});

// User Login API
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password"
        });
    }

    res.status(200).json({
        message: "Login successful",
        user: {
            email: email
        }
    });
});

module.exports = router;