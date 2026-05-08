const userService = require("../services/user.service");

const getUsers = (req, res) => {
  const secret = req.headers["x-internal-secret"];
  if (secret !== process.env.INTERNAL_SECRET) {
    return res
      .status(403)
      .json({ success: false, error: "Access denied. Use the gateway." });
  }

  console.log(`[User Controller] Fetching all users`);
  try {
    const users = userService.getAllUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUser = (req, res) => {
  const secret = req.headers["x-internal-secret"];
  if (secret !== process.env.INTERNAL_SECRET) {
    return res
      .status(403)
      .json({ success: false, error: "Access denied. Use the gateway." });
  }

  const { id } = req.params;
  console.log(`[User Controller] Fetching user id=${id}`);
  try {
    const user = userService.getUserById(id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

module.exports = { getUsers, getUser };
