const express = require('express');
const factRoutes = require('./routes/fact.routes');

const app = express();
const PORT = 9003;

app.use(express.json());
app.use('/', factRoutes);

app.listen(PORT, () => {
  console.log(`✅ Fact Service running on http://localhost:${PORT}`);
});
