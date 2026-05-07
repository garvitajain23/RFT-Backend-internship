const facts = require('../data/facts.data');

let recentIndices = [];
const RECENT_LIMIT = 3;

const getRandomFact = (req, res) => {
  try {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * facts.length);
    } while (recentIndices.includes(randomIndex));

    recentIndices.push(randomIndex);
    if (recentIndices.length > RECENT_LIMIT) recentIndices.shift();

    res.status(200).json({
      success: true,
      type: "fact",
      data: facts[randomIndex]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching fact",
      error: error.message
    });
  }
};

module.exports = { getRandomFact };
