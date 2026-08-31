require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('../../config/db');
const authRoutes = require('./routes/auth.routes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => res.json({ service: 'auth-service', status: 'UP' }));

const PORT = process.env.AUTH_SERVICE_PORT || 5001;
app.listen(PORT, () => console.log(`🔐 Auth Service running on port ${PORT}`));