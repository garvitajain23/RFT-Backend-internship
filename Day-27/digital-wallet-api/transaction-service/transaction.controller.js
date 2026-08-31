const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('./transaction.model');

const WALLET_URL = process.env.WALLET_SERVICE_URL;

const sendMoney = async (req, res) => {
  const { senderId, receiverId, amount, note } = req.body;

  if (!senderId || !receiverId || !amount) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  if (senderId === receiverId) {
    return res.status(400).json({ success: false, message: 'Cannot send money to yourself' });
  }
  if (amount <= 0) {
    return res.status(400).json({ success: false, message: 'Amount must be positive' });
  }

  try {
    // Debit sender (wallet-service checks balance + daily limit)
    await axios.post(`${WALLET_URL}/api/wallet/debit`, { userId: senderId, amount });

    // Credit receiver — roll back sender debit if this fails
    try {
      await axios.post(`${WALLET_URL}/api/wallet/credit`, { userId: receiverId, amount });
    } catch (creditError) {
      await axios.post(`${WALLET_URL}/api/wallet/credit`, { userId: senderId, amount });
      throw new Error('Receiver wallet not found. Transaction rolled back.');
    }

    const transaction = await Transaction.create({ senderId, receiverId, amount, note, status: 'success' });
    res.status(201).json({ success: true, message: 'Money sent successfully', data: transaction });
  } catch (error) {
    await Transaction.create({ senderId, receiverId, amount, note, status: 'failed' });
    res.status(400).json({
      success: false,
      message: error.response?.data?.message || error.message
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const uid = new mongoose.Types.ObjectId(req.params.userId);

    const sent = await Transaction.aggregate([
      { $match: { senderId: uid, status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    const received = await Transaction.aggregate([
      { $match: { receiverId: uid, status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    const monthly = await Transaction.aggregate([
      { $match: { $or: [{ senderId: uid }, { receiverId: uid }], status: 'success' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalSent: sent[0]?.total || 0,
        totalSentCount: sent[0]?.count || 0,
        totalReceived: received[0]?.total || 0,
        totalReceivedCount: received[0]?.count || 0,
        monthlyBreakdown: monthly
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendMoney, getHistory, getAnalytics };