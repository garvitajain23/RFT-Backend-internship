const QRCode = require("qrcode");

const generateQR = async (data) => {
  try {
    return await QRCode.toDataURL(data); // returns base64 image string
  } catch (err) {
    throw new Error("QR generation failed: " + err.message);
  }
};

module.exports = { generateQR };