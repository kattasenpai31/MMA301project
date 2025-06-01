const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/category.route");
const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Manga Reading App API");
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Đăng ký route categories - PHẢI ĐẶT TRƯỚC middleware 404
app.use("/api/categories", categoryRoutes);

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
const PORT = process.env.PORT || 9999;
const HOSTNAME = "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});

module.exports = app;
