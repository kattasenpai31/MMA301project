// middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Không có token." });

  jwt.verify(token, process.env.JWT_KEY || "secret", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ." });
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticateToken;
