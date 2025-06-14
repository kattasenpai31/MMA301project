const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/category.route");
const userRoutes = require("./routes/user.route");
const mangaRoutes = require("./routes/manga.route");
const authRoutes = require("./routes/auth.route");

const cors = require("cors");

const app = express();
app.use(cors());
// Kết nối database
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Manga Reading App API");
});

// Đăng ký route categories - PHẢI ĐẶT TRƯỚC middleware 404
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mangas", mangaRoutes);
app.use("/api/auth", authRoutes);

// Xử lý lỗi 404 - PHẢI ĐẶT SAU CÁC ROUTE KHÁC
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Xử lý lỗi server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

// Khởi chạy server
const PORT = process.env.PORT || 8080;
const HOSTNAME = "localhost";

connectDB().then(() => {
  app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
  });
});
module.exports = app;
