require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./src/config/db');
const routes = require('./src/routes');
const errorMiddleware = require('./src/middlewares/error.middleware');
const logger = require('./src/utils/logger');

const app = express();

// Connect Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Support Ticket API is running 🚀' });
});

// Mount all service routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});