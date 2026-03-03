const User = require("../models/User");
const AppError = require("../utils/AppError");

class UserService {
  //lấy thông tin user hiện tại
  async getMe(userId) {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  //tạo user mới (admin)
  async createUser(data) {
    const {
      username,
      email,
      phone,
      password,
      role,
      specialization,
      experienceYears,
      certification,
      address,
      name,
      avatar,
      isActive,
      birthDate,
      bio,
      preferences,
    } = data;

    if (!password) {
      throw new AppError("Password is required", 400);
    }

    const userExists = await User.findOne({
      $or: [{ username }, { email }, { phone }],
    });

    if (userExists) {
      throw new AppError("User already exists", 409);
    }

    const user = await User.create({
      username,
      email,
      phone,
      password,
      role: role || "parent",
      specialization,
      experienceYears,
      certification,
      address,
      name,
      avatar,
      isActive: isActive !== undefined ? isActive : true,
      birthDate,
      bio,
      preferences,
    });

    return await User.findById(user._id).select("-password");
  }
  //lấy tất cả user (admin)
  async getAllUsers(query) {
    const filter = {};

    if (query.role) {
      filter.role = query.role;
    }

    return await User.find(filter).select("-password");
  }
  //lấy user theo id (admin)
  async getUserById(id) {
    const user = await User.findById(id).select("-password");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
  //câp nhật user (admin)
  async updateUser(id, data) {
    const user = await User.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Không đổi pass qua api này
    if (data.password) {
      throw new AppError("Use change password API", 400);
    }

    // Cho phép cập nhật username, email, phone nếu là admin
    const allowedFields = [
      "name",
      "avatar",
      "isActive",
      "birthDate",
      "bio",
      "preferences",
      "specialization",
      "experienceYears",
      "certification",
      "address",
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        user[field] = data[field];
      }
    }

    await user.save();

    return await User.findById(id).select("-password");
  }

  //cập nhật profile (user)
  async updateProfile(userId, data) {
    const { password, role, username, email, phone, ...updateData } = data;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (role) {
      throw new AppError("Cannot change role", 403);
    }

    if (password) {
      throw new AppError("Use change password API", 400);
    }

    Object.assign(user, updateData);
    await user.save();

    return await User.findById(userId).select("-password");
  }
  //xóa user (admin)
  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return { message: "User deleted successfully" };
  }
  //lấy tất cả giáo viên
  async getTeachers() {
    return await User.find({ role: "teacher" }).select("-password");
  }
  //đổi mật khẩu
  async changePassword(userId, oldPassword, newPassword) {
    if (!oldPassword || !newPassword) {
      throw new AppError("Old and new password required", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      throw new AppError("Old password incorrect", 401);
    }

    user.password = newPassword;
    await user.save();

    return {
      success: true,
      message: "Password changed successfully",
    };
  }
}

module.exports = new UserService();
