require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const app = require("./app");

const PORT = process.env.GATEWAY_PORT || 5000;

app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));