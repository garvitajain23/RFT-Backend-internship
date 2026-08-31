const QRCode = require('qrcode');

const generateQRCode = async (text) => {
  try {
    // returns a base64 data URL you can embed directly in <img src="...">
    const qrDataUrl = await QRCode.toDataURL(text);
    return qrDataUrl;
  } catch (err) {
    throw new Error('QR code generation failed');
  }
};

module.exports = generateQRCode;