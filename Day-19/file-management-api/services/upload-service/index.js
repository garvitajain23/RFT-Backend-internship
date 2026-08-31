require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const uploadRoutes = require('./upload.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Create uploads folder if missing
if (!fs.existsSync('./services/upload-service/uploads')) {
  fs.mkdirSync('./services/upload-service/uploads', { recursive: true });
}

app.use('/upload', uploadRoutes);

app.get('/health', (req, res) =>
  res.json({ service: 'upload-service', status: 'UP' })
);

app.listen(process.env.UPLOAD_PORT, () =>
  console.log(`Upload Service → http://localhost:${process.env.UPLOAD_PORT}`)
);