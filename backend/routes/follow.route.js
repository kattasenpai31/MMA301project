const express = require("express");
const FollowRouter = express.Router();
const FollowController = require("../controllers/follow.controller");
const authenticateToken = require("../middleware/auth.middleware");

FollowRouter.post("/", authenticateToken, FollowController.followManga);
FollowRouter.delete("/", authenticateToken, FollowController.unfollowManga);
FollowRouter.get(
  "/check/:mangaId",
  authenticateToken,
  FollowController.CheckFollowed
);
FollowRouter.get("/", authenticateToken, FollowController.getAllMangaFollows);
module.exports = FollowRouter;
