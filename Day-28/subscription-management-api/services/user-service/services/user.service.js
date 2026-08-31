const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const jwtConfig = require("../../../config/jwtConfig");

class UserService {
  async register({ name, email, password, role }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists with this email");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
    });

    return this._sanitize(user);
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return { token, user: this._sanitize(user) };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return this._sanitize(user);
  }

  async getAllUsers() {
    const users = await User.find();
    return users.map(this._sanitize);
  }

  _sanitize(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}

module.exports = new UserService();