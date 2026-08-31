const express = require('express');
const router = express.Router();
const {
  createWallet,
  getBalance,
  addMoney,
  debitWallet,
  creditWallet
} = require('./wallet.controller');

router.post('/create', createWallet);
router.get('/balance/:userId', getBalance);
router.post('/add-money', addMoney);
router.post('/debit', debitWallet);   // internal, called by transaction-service
router.post('/credit', creditWallet); // internal, called by transaction-service

module.exports = router;