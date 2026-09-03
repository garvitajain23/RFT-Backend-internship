const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/file.routes');
const folderRoutes = require('./routes/folder.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/files', fileRoutes);
app.use('/api/folders', folderRoutes);

app.get('/health', (req, res) => res.json({ status: 'File Service is up' }));

app.use(errorHandler);

module.exports = app;