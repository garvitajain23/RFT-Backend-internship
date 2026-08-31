exports.sendPushNotification = async (req, res) => {
  try {
    const { deviceToken, title, body } = req.body;

    if (!deviceToken || !title || !body) {
      return res.status(400).json({ success: false, message: 'deviceToken, title, and body are required' });
    }

    // Simulated Push Gateway dispatch (FCM / APNS payload)
    const simulatedDispatch = {
      multicast_id: Date.now(),
      success: 1,
      failure: 0,
      results: [{ message_id: `msg_${Math.random().toString(36).substr(2, 9)}` }]
    };

    console.log(`[Push-Service] Push dispatched to token ${deviceToken}: "${title}"`);
    res.status(200).json({ success: true, data: simulatedDispatch });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};