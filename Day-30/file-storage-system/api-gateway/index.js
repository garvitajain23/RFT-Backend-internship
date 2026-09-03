const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '/api/auth' }
}));

app.use('/api/files', createProxyMiddleware({
  target: process.env.FILE_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/files': '/api/files' }
}));

app.use('/api/folders', createProxyMiddleware({
  target: process.env.FILE_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/folders': '/api/folders' }
}));

app.get('/health', (req, res) => res.json({ status: 'Gateway is up' }));

const PORT = process.env.PORT_GATEWAY || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));