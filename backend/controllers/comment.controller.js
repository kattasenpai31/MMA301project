const Comment = require("../models/Comments");
const Manga = require("../models/Mangas");
// Tạo comment mới
// exports.createComment = async (req, res) => {
//   console.log("==> createComment called");
//   console.log("req.body:", req.body);
//   console.log("req.userId:", req.userId);

//   try {
//     const { mangaId, content } = req.body;

//     const comment = await Comment.create({
//       manga: mangaId,
//       user: req.userId, // dùng userId từ middleware
//       content,
//     });

//     // Gán comment vào manga
//     await Manga.findByIdAndUpdate(mangaId, {
//       $push: { comments: comment._id },
//     });

//     res.status(201).json(comment);
//   } catch (error) {
//     console.error("Lỗi tạo comment:", error);
//     res
//       .status(500)
//       .json({ message: "Lỗi khi tạo bình luận", error: error.message });
//   }
// };

// Lấy danh sách comment theo mangaId
exports.getAllCommentsByManga = async (req, res) => {
  try {
    const mangaId = req.params.mangaId;
    const comments = await Comment.find({ manga: mangaId })
      .populate("user", "fullName avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error("Lỗi lấy comment:", error);
    res.status(500).json({ message: "Lỗi server khi lấy comment." });
  }
};

// Cập nhật comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.userId; // Lấy từ middleware

    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment không tồn tại." });

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền sửa comment này." });
    }

    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error("Lỗi cập nhật comment:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật comment." });
  }
};

// Xóa comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.userId;

    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment không tồn tại." });

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xóa comment này." });
    }

    await Comment.findByIdAndDelete(commentId);

    // Optionally xóa comment khỏi manga.comments[]
    await Manga.findByIdAndUpdate(comment.manga, {
      $pull: { comments: comment._id },
    });

    res.json({ message: "Xóa comment thành công." });
  } catch (error) {
    console.error("Lỗi xóa comment:", error);
    res.status(500).json({ message: "Lỗi server khi xóa comment." });
  }
};

exports.createCommentByManga = async (req, res) => {
  try {
    const { mangaId, content } = req.body;
    const userId = req.userId;

    if (!mangaId || !content) {
      return res
        .status(400)
        .json({ message: "Manga ID và nội dung là bắt buộc." });
    }

    const comment = await Comment.create({
      manga: mangaId,
      user: userId,
      content,
    });

    await Manga.findByIdAndUpdate(mangaId, {
      $push: { comments: comment._id },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Lỗi tạo comment:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi tạo bình luận", error: error.message });
  }
};
