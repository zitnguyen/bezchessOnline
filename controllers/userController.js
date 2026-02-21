const userService = require("../services/userService");
const asyncHandler = require("../middleware/asyncHandler");

//lấy thông tin người dùng hiện tại
exports.getMe = asyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
//tạo người dùng mới (admin)
exports.createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});
//lấy tất cả người dùng(admin)
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers(req.query);

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});
//lấy người dùng theo id
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
//cập nhật người dùng (admin)
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Cập nhật người dùng thành công",
    data: user,
  });
});
//cập nhật hồ sơ người dùng
exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Cập nhật hồ sơ thành công",
    data: user,
  });
});
//xóa người dùng
exports.deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(200).json({
    success: true,
    message: "Đã xóa người dùng",
  });
});
//lấy danh sách giáo viên
exports.getTeachers = asyncHandler(async (req, res) => {
  const teachers = await userService.getTeachers();

  res.status(200).json({
    success: true,
    count: teachers.length,
    data: teachers,
  });
});
//thay đổi mật khẩu
exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const result = await userService.changePassword(
    req.user._id,
    oldPassword,
    newPassword,
  );

  res.status(200).json({
    success: true,
    message: result.message,
  });
});
