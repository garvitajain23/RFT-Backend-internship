require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.AUTH_PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Auth Service running on port ${PORT}`));
});