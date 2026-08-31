require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const userRoutes = require('./user.routes');

connectDB('USER-SERVICE');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send('User Service is running...'));

const PORT = process.env.USER_SERVICE_PORT || 5000;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));