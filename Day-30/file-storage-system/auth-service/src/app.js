const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => res.json({ status: 'Auth Service is up' }));

app.use(errorHandler);

module.exports = app;