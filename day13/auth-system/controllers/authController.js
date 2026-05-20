const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, SALT_ROUNDS } = require("../config/config");

// Temporary database
const users = [];

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    // Step 1: Get email and password from request
    const { email, password } = req.body;

    // Step 2: Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Step 3: Find user by email
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Step 4: Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Step 5: Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Step 6: Send token back
    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// PROFILE - Protected
const profile = (req, res) => {
  // req.user was set by our middleware
  const user = users.find((u) => u.id === req.user.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "Profile fetched successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = { register, login, profile, users };
