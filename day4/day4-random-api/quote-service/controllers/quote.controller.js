const quotes = require('../data/quotes.data');

let recentIndices = [];
const RECENT_LIMIT = 3;

const getRandomQuote = (req, res) => {
  try {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (recentIndices.includes(randomIndex));

    recentIndices.push(randomIndex);
    if (recentIndices.length > RECENT_LIMIT) recentIndices.shift();

    res.status(200).json({
      success: true,
      type: "quote",
      data: quotes[randomIndex]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching quote",
      error: error.message
    });
  }
};

module.exports = { getRandomQuote };
