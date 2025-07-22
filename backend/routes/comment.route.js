const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const authenticate = require("../middleware/auth.middleware");

// Create a new comment
router.get("/manga/:mangaId", commentController.getAllCommentsByManga);
router.post(
  "/manga/:mangaId",
  authenticate,
  commentController.createCommentByManga
);
// Update a comment
router.put("/:commentId", authenticate, commentController.updateComment);
// Delete a comment
router.delete("/:commentId", authenticate, commentController.deleteComment);

module.exports = router;
