const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controllers/user.controller");
const authenticateToken = require("../middleware/auth.middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/avatars"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `user-${req.userId}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });
UserRouter.post("/forgot_password", UserController.forgotPassword);
UserRouter.post(
  "/upload-avatar",
  authenticateToken,
  upload.single("avatar"),
  UserController.uploadAvatar
);
UserRouter.get("/profile", authenticateToken, UserController.getProfile);
UserRouter.put(
  "/change_password",
  authenticateToken,
  UserController.ChangePassword
);
UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.post("/", UserController.createUser);
UserRouter.put("/:id", UserController.updateUser);
UserRouter.delete("/:id", UserController.deleteUser);

module.exports = UserRouter;
