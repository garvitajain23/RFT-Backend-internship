const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('./user.model');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register user + auto-create wallet in wallet-service
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, phone, password: hashedPassword });

    try {
      await axios.post(`${process.env.WALLET_SERVICE_URL}/api/wallet/create`, {
        userId: user._id
      });
    } catch (err) {
      console.error('Wallet creation failed:', err.message);
    }

    res.status(201).json({
      success: true,
      data: { _id: user._id, name: user.name, email: user.email, phone: user.phone },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      data: { _id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const setTransactionPin = async (req, res) => {
  try {
    const { userId, pin } = req.body;
    if (!/^\d{4,6}$/.test(pin)) {
      return res.status(400).json({ success: false, message: 'PIN must be 4-6 digits' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);

    const user = await User.findByIdAndUpdate(
      userId,
      { pin: hashedPin, isPinSet: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'Transaction PIN set successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyTransactionPin = async (req, res) => {
  try {
    const { userId, pin } = req.body;
    const user = await User.findById(userId);

    if (!user || !user.isPinSet) {
      return res.status(400).json({ success: false, message: 'PIN not set for this user' });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect PIN' });
    }

    res.json({ success: true, message: 'PIN verified' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -pin');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, setTransactionPin, verifyTransactionPin, getUserById };