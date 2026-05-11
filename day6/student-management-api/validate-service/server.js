require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const app = require("./app");

const PORT = process.env.VALIDATE_SERVICE_PORT || 6002;

app.listen(PORT, () => {
  console.log(`🚀 Validate Service running on port ${PORT}`);
});
