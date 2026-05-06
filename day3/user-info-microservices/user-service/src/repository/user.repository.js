const users = require("../data/users.data");

class UserRepository {
  getAll() {
    return users;
  }

  getById(id) {
    return users.find((u) => u.id === parseInt(id)) || null;
  }
}

module.exports = new UserRepository();
