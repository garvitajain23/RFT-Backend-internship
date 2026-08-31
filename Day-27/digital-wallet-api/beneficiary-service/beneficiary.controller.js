const axios = require('axios');
const Beneficiary = require('./beneficiary.model');

const addBeneficiary = async (req, res) => {
  try {
    const { userId, beneficiaryUserId, nickname, email } = req.body;

    if (userId === beneficiaryUserId) {
      return res.status(400).json({ success: false, message: 'Cannot add yourself as beneficiary' });
    }

    try {
      await axios.get(`${process.env.USER_SERVICE_URL}/api/users/${beneficiaryUserId}`);
    } catch {
      return res.status(404).json({ success: false, message: 'Beneficiary user does not exist' });
    }

    const beneficiary = await Beneficiary.create({ userId, beneficiaryUserId, nickname, email });
    res.status(201).json({ success: true, data: beneficiary });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Beneficiary already added' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, count: beneficiaries.length, data: beneficiaries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBeneficiary = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findByIdAndDelete(req.params.id);
    if (!beneficiary) return res.status(404).json({ success: false, message: 'Beneficiary not found' });
    res.json({ success: true, message: 'Beneficiary removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addBeneficiary, getBeneficiaries, deleteBeneficiary };