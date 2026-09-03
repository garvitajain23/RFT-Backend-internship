const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT_AUTH || 5001;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
});