require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const app = require("./app");

const PORT = process.env.IDGUARD_SERVICE_PORT || 6003;

app.listen(PORT, () => {
  console.log(`🚀 IDGuard Service running on port ${PORT}`);
});
