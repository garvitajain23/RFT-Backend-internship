require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pushRoutes = require('./push.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/push', pushRoutes);

const PORT = process.env.PUSH_SERVICE_PORT || 5003;
app.listen(PORT, () => {
  console.log(`📲 Push Service running on port ${PORT}`);
});