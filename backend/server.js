const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Blog Application Backend is running!");
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log("MongoDB connection error:", error));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});