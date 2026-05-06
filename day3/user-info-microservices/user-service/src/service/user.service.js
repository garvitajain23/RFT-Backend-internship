const userRepository = require("../repository/user.repository");

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(id) {
    const user = userRepository.getById(id);
    if (!user) {
      const err = new Error(`User with ID ${id} not found`);
      err.statusCode = 404;
      throw err;
    }
    return user;
  }
}

module.exports = new UserService();
