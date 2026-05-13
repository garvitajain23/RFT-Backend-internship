const validateRegister = (email, password) => {
  const errors = [];

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  // Password length check (min 6 chars)
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return errors;
};

module.exports = { validateRegister };
