// Pure business logic — no req/res here
const { v4: uuidv4 } = require("uuid");

let notes = []; // In-memory store (like a mock DB)

const getAllNotes = (sortBy) => {
  if (sortBy === "title") {
    return [...notes].sort((a, b) => a.title.localeCompare(b.title));
  }
  return notes;
};

const searchNotes = (keyword) => {
  const kw = keyword.toLowerCase();
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(kw) ||
      n.content.toLowerCase().includes(kw),
  );
};

const getNoteById = (id) => notes.find((n) => n.id === id);

const addNote = ({ title, content }) => {
  if (!title || !content) {
    throw new Error("Title and content are required");
  }
  const note = { id: uuidv4(), title, content };
  notes.push(note);
  return note;
};

const updateNote = (id, { title, content }) => {
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) throw new Error("Note not found");
  notes[index] = { ...notes[index], title, content };
  return notes[index];
};

const deleteNote = (id) => {
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) throw new Error("Note not found");
  const deleted = notes.splice(index, 1);
  return deleted[0];
};

module.exports = {
  getAllNotes,
  searchNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
};
