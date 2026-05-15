const express = require("express");
const dotenv = require("dotenv");
const notesRoutes = require("./routes/notes.routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2001;

app.use(express.json()); // Parse JSON bodies

app.use("/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`📝 Notes Service running on http://localhost:${PORT}`);
});
