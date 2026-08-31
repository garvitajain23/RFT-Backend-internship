require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const walletRoutes = require('./wallet.routes');

connectDB('WALLET-SERVICE');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/wallet', walletRoutes);
app.get('/', (req, res) => res.send('Wallet Service is running...'));

const PORT = process.env.WALLET_SERVICE_PORT || 5001;
app.listen(PORT, () => console.log(`Wallet Service running on port ${PORT}`));