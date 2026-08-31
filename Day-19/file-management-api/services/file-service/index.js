require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const fileRoutes = require('./file.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/files', fileRoutes);

app.get('/health', (req, res) =>
  res.json({ service: 'file-service', status: 'UP' })
);

app.listen(process.env.FILE_PORT, () =>
  console.log(`File Service → http://localhost:${process.env.FILE_PORT}`)
);