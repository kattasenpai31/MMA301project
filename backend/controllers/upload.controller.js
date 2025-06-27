const multer = require("multer");
const path = require("path");

// Setup Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/avatars/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user-${req.user._id}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

app.post(
  "/api/user/upload-avatar",
  authenticateJWT,
  upload.single("avatar"),
  async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();
    res.json({ avatarUrl: user.avatar });
  }
);
