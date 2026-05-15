// Handles HTTP — calls service, sends response
const notesService = require("../services/notes.service");

const getAllNotes = (req, res) => {
  try {
    const { sortBy, search } = req.query;
    if (search) {
      return res.json(notesService.searchNotes(search));
    }
    res.json(notesService.getAllNotes(sortBy));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNoteById = (req, res) => {
  try {
    const note = notesService.getNoteById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addNote = (req, res) => {
  try {
    const note = notesService.addNote(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateNote = (req, res) => {
  try {
    const note = notesService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteNote = (req, res) => {
  try {
    const deleted = notesService.deleteNote(req.params.id);
    res.json({ message: "Note deleted", note: deleted });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { getAllNotes, getNoteById, addNote, updateNote, deleteNote };
