const authService = require("../services/authService");
const asyncHandler = require("../middleware/asyncHandler");
//đăng ký
exports.signup = asyncHandler(async (req, res) => {
  const user = await authService.signupService(req.body);

  res.status(201).json({
    success: true,
    message: "Đăng ký thành công",
    data: {
      userId: user._id,
      username: user.username,
    },
  });
});
//đăng nhập
exports.signin = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.signinService(
    req.body.username,
    req.body.password,
    req,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    data: {
      userId: user._id,
      username: user.username,
      name: user.name || "",
      role: user.role,
      accessToken,
    },
  });
});
//refresh
exports.refresh = asyncHandler(async (req, res) => {
  const refreshTokenFromCookie = req.cookies?.refreshToken;

  if (!refreshTokenFromCookie) {
    return res.status(401).json({
      success: false,
      message: "Refresh token missing",
    });
  }

  const { accessToken, refreshToken } = await authService.refreshService(
    refreshTokenFromCookie,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    data: {
      accessToken,
    },
  });
});
//đăng xuất
exports.logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await authService.logoutService(refreshToken);
  }

  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
  });
});
//đăng xuất tất cả thiết bị
exports.logoutAll = asyncHandler(async (req, res) => {
  await authService.logoutAllService(req.user.id);

  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Đăng xuất tất cả thiết bị thành công",
  });
});
