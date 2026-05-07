const express = require('express');
const gatewayRoutes = require('./routes/gateway.routes');

const app = express();
const PORT = 9000;

app.use(express.json());
app.use('/', gatewayRoutes);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
  console.log(`   → http://localhost:${PORT}/quote`);
  console.log(`   → http://localhost:${PORT}/joke`);
  console.log(`   → http://localhost:${PORT}/fact`);
});
