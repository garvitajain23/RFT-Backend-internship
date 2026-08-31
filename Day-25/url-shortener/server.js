require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cron = require('node-cron');

const connectDB = require('./src/config/db');
const urlRoutes = require('./src/routes/url.routes');
const errorHandler = require('./src/middlewares/errorHandler');
const urlService = require('./src/services/url.service');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check MUST come before urlRoutes (which has a catch-all /:shortId)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/', urlRoutes);

app.use(errorHandler);

cron.schedule('0 0 * * *', async () => {
  const count = await urlService.deleteExpiredUrls();
  console.log(`Cron: deleted ${count} expired URLs`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));