require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(cors());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Proxy routes to respective microservices
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path, req) => '/api/auth' + path,
  })
);

app.use(
  '/api/tasks',
  createProxyMiddleware({
    target: process.env.TASK_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path, req) => '/api/tasks' + path,
  })
);

app.use(
  '/api/notifications',
  createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path, req) => '/api/notifications' + path,
  })
);

app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API Gateway',
    docs: '/api-docs',
    services: {
      auth: '/api/auth',
      tasks: '/api/tasks',
      notifications: '/api/notifications',
    },
  });
});

const PORT = process.env.GATEWAY_PORT || 5000;
app.listen(PORT, () => console.log(`🚪 API Gateway running on port ${PORT}`));