const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Kết nối cơ sở dữ liệu
connectDB();

// Routes
const categoryRouter = require("./routes/category.route");
app.use("/api/category", categoryRouter);

// Khởi chạy server
const PORT = 9999;
const HOSTNAME = "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});

module.exports = app;
