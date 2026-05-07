const express = require('express');
const jokeRoutes = require('./routes/joke.routes');

const app = express();
const PORT = 9002;

app.use(express.json());
app.use('/', jokeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Joke Service running on http://localhost:${PORT}`);
});
