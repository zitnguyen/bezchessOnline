const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AppError = require("../utils/AppError");

//tạo access token,refresh token
const generateAccessToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new AppError("JWT_SECRET not configured", 500);
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "45m",
  });
};

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};
//đăng ký
exports.signupService = async (data) => {
  const { username, password, email, name, phone, address, role } = data;

  // validation required
  if (!username || !password || !phone || !email) {
    throw new AppError("Missing required fields", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  const phoneRegex = /^0\d{9,10}$/;
  if (!phoneRegex.test(phone)) {
    throw new AppError("Invalid phone number", 400);
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email format", 400);
    }
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { phone }, ...(email ? [{ email }] : [])],
  });

  if (existingUser) {
    if (existingUser.username === username) {
      throw new AppError("Username already exists", 409);
    }
    if (existingUser.phone === phone) {
      throw new AppError("Phone number already exists", 409);
    }
    if (email && existingUser.email === email) {
      throw new AppError("Email already exists", 409);
    }
  }

  const user = await User.create({
    username,
    password,
    email,
    name,
    phone,
    address,
    role: role || "parent",
  });

  return user;
};

//đăng nhập
exports.signinService = async (username, password, req) => {
  if (!username || !password) {
    throw new AppError("Username and password are required", 400);
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    throw new AppError("Invalid credentials", 401);
  }

  // Cập nhật lastLogin
  user.lastLogin = new Date();
  await user.save();

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken();

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
};

//refresh token
exports.refreshService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  const storedToken = await RefreshToken.findOne({ token: refreshToken });

  if (!storedToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (storedToken.expiresAt < new Date()) {
    await storedToken.deleteOne();
    throw new AppError("Refresh token expired", 401);
  }

  // Xóa refresh token cũ
  await storedToken.deleteOne();

  const newRefreshToken = generateRefreshToken();

  await RefreshToken.create({
    userId: storedToken.userId,
    token: newRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const newAccessToken = generateAccessToken(storedToken.userId);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
//đăng xuất
exports.logoutService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  await RefreshToken.deleteOne({ token: refreshToken });

  return { message: "Logout successful" };
};
//đăng xuất tất cả thiết bị
exports.logoutAllService = async (userId) => {
  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  await RefreshToken.deleteMany({ userId });

  return { message: "Logged out from all devices" };
};
