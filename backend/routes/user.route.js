const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controllers/user.controller");
const authenticateToken = require("../middleware/auth.middleware");

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
