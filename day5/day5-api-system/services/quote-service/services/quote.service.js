const quotes = [
  {
    id: 1,
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    id: 2,
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    id: 3,
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    id: 4,
    text: "Java is to JavaScript what car is to carpet.",
    author: "Chris Heilmann",
  },
  {
    id: 5,
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
];

const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
const getAllQuotes = () => quotes;

module.exports = { getRandomQuote, getAllQuotes };
