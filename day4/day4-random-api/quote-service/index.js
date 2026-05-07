const express = require('express');
const quoteRoutes = require('./routes/quote.routes');

const app = express();
const PORT = 9001;

app.use(express.json());
app.use('/', quoteRoutes);

app.listen(PORT, () => {
  console.log(`✅ Quote Service running on http://localhost:${PORT}`);
});
