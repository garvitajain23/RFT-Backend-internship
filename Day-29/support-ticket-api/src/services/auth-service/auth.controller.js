const authService = require('./auth.service');
const ApiResponse = require('../../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    return ApiResponse.success(res, 201, 'User registered successfully', {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    return ApiResponse.success(res, 200, 'Login successful', {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };