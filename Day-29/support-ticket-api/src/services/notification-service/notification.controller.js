const sendEmail = require('../../utils/sendEmail');
const ApiResponse = require('../../utils/apiResponse');

// Manual test endpoint to verify email config works
const testNotification = async (req, res, next) => {
  try {
    const { to, subject, message } = req.body;
    await sendEmail({ to, subject, text: message });
    return ApiResponse.success(res, 200, 'Test email sent (check logs for status)');
  } catch (error) {
    next(error);
  }
};

module.exports = { testNotification };