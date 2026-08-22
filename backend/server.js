const express = require("express");
const cors = require("cors");

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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});