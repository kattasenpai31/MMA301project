const express = require("express");
const router = express.Router();
const {
  getReadingHistoryByUser,
} = require("../controllers/readingHistory.controller");
const verifyToken = require("../middleware/auth.middleware");

router.get("/user", verifyToken, getReadingHistoryByUser);
router.get("/:mangaId", verifyToken, getReadingHistoryByUser);
module.exports = router;
