const { generateQR } = require("./qrGenerator");
const { success, error } = require("../../apiResponse");

const testQR = async (req, res) => {
  try {
    const qr = await generateQR(req.body.data || "test-data");
    return success(res, 200, "QR generated", { qr });
  } catch (err) {
    return error(res, 500, err.message);
  }
};

module.exports = { testQR };