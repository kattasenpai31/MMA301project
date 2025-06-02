const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  avatar: { type: String },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema, "User");
