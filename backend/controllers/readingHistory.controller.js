const ReadingHistory = require("../models/Reading_History");

exports.getReadingHistoryByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const histories = await ReadingHistory.find({ user: userId })
      .sort({ lastReadAt: -1 })
      .populate({
        path: "manga",
        select: "title coverImage status genres",
      })
      .populate({
        path: "chapter",
        select: "title number",
      });

    res.status(200).json(histories);
  } catch (error) {
    console.error("Error getting reading history:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addReadingHistory = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const userId = req.user._id;

    const history = await ReadingHistory.findOne({
      user: userId,
      manga: mangaId,
    }).populate("chapter", "title number");

    res.status(200).json(history);
  } catch (error) {
    console.error("Lỗi lấy lịch sử:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
