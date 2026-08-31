const Wallet = require('./wallet.model');

const resetDailyLimitIfNeeded = (wallet) => {
  const today = new Date().toDateString();
  const lastReset = new Date(wallet.lastResetDate).toDateString();
  if (today !== lastReset) {
    wallet.dailyUsed = 0;
    wallet.lastResetDate = new Date();
  }
};

const createWallet = async (req, res) => {
  try {
    const { userId } = req.body;
    const existing = await Wallet.findOne({ userId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Wallet already exists' });
    }
    const wallet = await Wallet.create({ userId });
    res.status(201).json({ success: true, data: wallet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });
    res.json({ success: true, data: { balance: wallet.balance } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addMoney = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be positive' });
    }

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });

    wallet.balance += amount;
    await wallet.save();

    res.json({ success: true, message: 'Money added successfully', data: { balance: wallet.balance } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Internal — called by transaction-service. Enforces daily limit + balance check.
const debitWallet = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });

    resetDailyLimitIfNeeded(wallet);

    if (wallet.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    if (wallet.dailyUsed + amount > wallet.dailyLimit) {
      return res.status(400).json({
        success: false,
        message: `Daily transaction limit exceeded. Remaining limit: ${wallet.dailyLimit - wallet.dailyUsed}`
      });
    }

    wallet.balance -= amount;
    wallet.dailyUsed += amount;
    await wallet.save();

    res.json({ success: true, data: { balance: wallet.balance } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Internal — called by transaction-service
const creditWallet = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });

    wallet.balance += amount;
    await wallet.save();

    res.json({ success: true, data: { balance: wallet.balance } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createWallet, getBalance, addMoney, debitWallet, creditWallet };