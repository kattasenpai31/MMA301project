const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const categoryRoutes = require("./routes/category.route");
const userRoutes = require("./routes/user.route");
const mangaRoutes = require("./routes/manga.route");
const authRoutes = require("./routes/auth.route");

const cors = require("cors");
const app = express();

// Sử dụng ejs-locals cho layout engine
app.engine("ejs", require("ejs-locals"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mangas", mangaRoutes);
app.use("/api/auth", authRoutes);

// View Routes
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const mangaViewRoutes = require("./routes/admin/manga.view.route");
app.use("/mangas", mangaViewRoutes);

// Error handlers
app.use((req, res) => {
  res.status(404).render("404", { title: "Không tìm thấy trang" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { title: "Lỗi Server" });
});

// Start server
const PORT = process.env.PORT || 8080;
const HOSTNAME = "localhost";

connectDB().then(() => {
  app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
  });
});

module.exports = app;
