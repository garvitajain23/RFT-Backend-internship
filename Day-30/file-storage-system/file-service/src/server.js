const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT_FILE || 5002;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`File Service running on port ${PORT}`));
});