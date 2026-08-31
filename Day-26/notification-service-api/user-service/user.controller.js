const User = require('./user.model');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, deviceToken } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: 'User already exists' });

    user = await User.create({ name, email, deviceToken });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ success: true, data: user, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { inAppEnabled, pushEnabled } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (inAppEnabled !== undefined) user.preferences.inAppEnabled = inAppEnabled;
    if (pushEnabled !== undefined) user.preferences.pushEnabled = pushEnabled;

    await user.save();
    res.status(200).json({ success: true, message: 'Preferences updated', data: user.preferences });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};