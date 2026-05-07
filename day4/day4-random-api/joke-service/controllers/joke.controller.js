const jokes = require('../data/jokes.data');

let recentIndices = [];
const RECENT_LIMIT = 3;

const getRandomJoke = (req, res) => {
  try {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * jokes.length);
    } while (recentIndices.includes(randomIndex));

    recentIndices.push(randomIndex);
    if (recentIndices.length > RECENT_LIMIT) recentIndices.shift();

    res.status(200).json({
      success: true,
      type: "joke",
      data: jokes[randomIndex]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching joke",
      error: error.message
    });
  }
};

module.exports = { getRandomJoke };
