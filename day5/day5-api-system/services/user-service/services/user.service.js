const users = [
  { id: 1, name: "Aryan", email: "aryan@example.com", role: "admin" },
  { id: 2, name: "Priya", email: "priya@example.com", role: "user" },
  { id: 3, name: "Rahul", email: "rahul@example.com", role: "user" },
];

const getAllUsers = () => users;

const getUserById = (id) => {
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) throw new Error(`User with id ${id} not found`);
  return user;
};

module.exports = { getAllUsers, getUserById };
