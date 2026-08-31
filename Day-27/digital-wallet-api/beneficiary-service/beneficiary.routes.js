const express = require('express');
const router = express.Router();
const { addBeneficiary, getBeneficiaries, deleteBeneficiary } = require('./beneficiary.controller');

router.post('/add', addBeneficiary);
router.get('/:userId', getBeneficiaries);
router.delete('/:id', deleteBeneficiary);

module.exports = router;