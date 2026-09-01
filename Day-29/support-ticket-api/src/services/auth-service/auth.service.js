const jwt = require('jsonwebtoken');
const User = require('./user.model');

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerUser = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('User already exists with this email');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id, user.role);
  return { user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user._id, user.role);
  return { user, token };
};

module.exports = { registerUser, loginUser, generateToken };