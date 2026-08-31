// Re-exports shared token verification for this service's local use
const { verifyToken, isAdmin } = require("../../../shared/middlewares/verifyToken");

module.exports = { verifyToken, isAdmin };