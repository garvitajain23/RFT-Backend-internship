require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.USER_PORT || 5002;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 User Service running on port ${PORT}`));
});