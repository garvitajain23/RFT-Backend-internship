const userService = require("../services/user.service");
const ApiResponse = require("../../../shared/utils/apiResponse");

class UserController {
  async register(req, res, next) {
    try {
      const user = await userService.register(req.body);
      return ApiResponse.success(res, "User registered successfully", user, 201);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await userService.login(req.body);
      return ApiResponse.success(res, "Login successful", result);
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await userService.getProfile(req.user.id);
      return ApiResponse.success(res, "Profile fetched successfully", user);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return ApiResponse.success(res, "Users fetched successfully", users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();