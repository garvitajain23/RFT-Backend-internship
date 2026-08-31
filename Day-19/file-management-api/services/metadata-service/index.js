require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const metadataRoutes = require('./metadata.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/metadata', metadataRoutes);

app.get('/health', (req, res) =>
  res.json({ service: 'metadata-service', status: 'UP' })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected — Metadata Service');
    app.listen(process.env.METADATA_PORT, () =>
      console.log(`Metadata Service → http://localhost:${process.env.METADATA_PORT}`)
    );
  })
  .catch((err) => console.error('DB Error:', err));