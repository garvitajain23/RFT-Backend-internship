require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const userRoutes = require('./user.routes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB('User-Service');

app.use('/api/users', userRoutes);

const PORT = process.env.USER_SERVICE_PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});