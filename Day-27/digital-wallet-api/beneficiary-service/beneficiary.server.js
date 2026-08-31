require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const beneficiaryRoutes = require('./beneficiary.routes');

connectDB('BENEFICIARY-SERVICE');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/beneficiary', beneficiaryRoutes);
app.get('/', (req, res) => res.send('Beneficiary Service is running...'));

const PORT = process.env.BENEFICIARY_SERVICE_PORT || 5003;
app.listen(PORT, () => console.log(`Beneficiary Service running on port ${PORT}`));