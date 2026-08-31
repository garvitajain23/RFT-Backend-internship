require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const transactionRoutes = require('./transaction.routes');

connectDB('TRANSACTION-SERVICE');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/transactions', transactionRoutes);
app.get('/', (req, res) => res.send('Transaction Service is running...'));

const PORT = process.env.TRANSACTION_SERVICE_PORT || 5002;
app.listen(PORT, () => console.log(`Transaction Service running on port ${PORT}`));