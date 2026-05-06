const userService = require("../service/user.service");

const getAllUsers = (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    next(err);
  }
};

const getUserById = (req, res, next) => {
  try {
    const user = userService.getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getUserById };
