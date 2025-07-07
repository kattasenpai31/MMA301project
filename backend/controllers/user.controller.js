const mongoose = require("mongoose");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { loginName, email, password, fullName, phoneNumber, avatar } =
      req.body;

    const existingUser = await User.findOne({ loginName });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      loginName,
      email,
      password: hashedPassword,
      fullName,
      phoneNumber,
      avatar,
    });

    await user.save();
    res.status(201).json({ message: "Tạo tài khoản thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, fullName, phoneNumber, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, fullName, phoneNumber, avatar },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const jwt = require("jsonwebtoken");

const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Thiếu hoặc sai định dạng token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY || "secret");

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    return res.status(200).json(user); // ✅ Trả trực tiếp object user (không bọc thêm trong `{ user: ... }`)
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token không hợp lệ", error: err.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const { loginName, email, fullName, phoneNumber } = req.body;
    const userId = req.userId; // từ middleware đã gán

    if (!loginName || !email) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    user.loginName = loginName;
    user.email = email;
    user.fullName = fullName;
    user.phoneNumber = phoneNumber;

    await user.save();

    return res.status(200).json({ message: "Chinh sửa thành cong" });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Thiếu mật khẩu" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // So sánh chuỗi (không dùng bcrypt)
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    // Gán mật khẩu mới (không mã hoá)
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có tệp được tải lên." });
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    const userId = req.userId; // từ middleware đã gán

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarPath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.json({ avatarUrl: avatarPath });
  } catch (error) {
    console.error("Lỗi upload avatar:", error);
    res.status(500).json({ message: "Lỗi server khi upload ảnh" });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại." });
    }

    // Gán trực tiếp mật khẩu mới (không mã hoá)
    user.password = newPassword;

    await user.save();

    return res.json({ message: "Mật khẩu đã được đặt lại thành công." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Đã có lỗi xảy ra." });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  ChangePassword,
  uploadAvatar,
  forgotPassword,
  editProfile,
};
