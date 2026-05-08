const quoteService = require("../services/quote.service");

const getRandom = (req, res) => {
  const secret = req.headers["x-internal-secret"];
  if (secret !== process.env.INTERNAL_SECRET) {
    return res
      .status(403)
      .json({ success: false, error: "Access denied. Use the gateway." });
  }

  console.log(`[Quote Controller] Fetching random quote`);
  try {
    const quote = quoteService.getRandomQuote();
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAll = (req, res) => {
  const secret = req.headers["x-internal-secret"];
  if (secret !== process.env.INTERNAL_SECRET) {
    return res
      .status(403)
      .json({ success: false, error: "Access denied. Use the gateway." });
  }

  console.log(`[Quote Controller] Fetching all quotes`);
  try {
    const quotes = quoteService.getAllQuotes();
    res.status(200).json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getRandom, getAll };
