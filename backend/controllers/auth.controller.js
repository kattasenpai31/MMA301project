const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { loginName, email, password, fullName, phoneNumber } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { loginName }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại." });
    }

    const user = new User({
      loginName,
      email,
      password,
      fullName,
      phoneNumber,
    });

    await user.save();

    res.status(201).json({ message: "Đăng ký thành công." });
  } catch (err) {
    console.error("Lỗi đăng ký:", err); // ✅ Thêm dòng này để log chi tiết lỗi
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { loginName, password } = req.body;
    const user = await User.findOne({ loginName });

    if (!user) {
      return res.status(400).json({ message: "Sai thông tin đăng nhập." });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Sai mật khẩu." });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_KEY || "secret",
      {
        expiresIn: "12d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        loginName: user.loginName,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
