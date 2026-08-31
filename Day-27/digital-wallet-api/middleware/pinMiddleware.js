const axios = require('axios');

const verifyPin = async (req, res, next) => {
  try {
    const { senderId, pin } = req.body;
    if (!pin) {
      return res.status(400).json({ success: false, message: 'Transaction PIN is required' });
    }

    const response = await axios.post(`${process.env.USER_SERVICE_URL}/api/users/verify-pin`, {
      userId: senderId,
      pin
    });

    if (!response.data.success) {
      return res.status(401).json({ success: false, message: 'Invalid transaction PIN' });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.response?.data?.message || 'PIN verification failed'
    });
  }
};

module.exports = { verifyPin };