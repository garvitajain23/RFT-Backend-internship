require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.ANALYTICS_PORT || 5003;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Analytics Service running on port ${PORT}`));
});