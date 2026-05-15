const express = require("express");
const router = express.Router();
const controller = require("../controllers/notes.controller");

// CRUD routes
router.get("/", controller.getAllNotes); // GET  /notes        (+ ?search= + ?sortBy=)
router.get("/:id", controller.getNoteById); // GET  /notes/:id
router.post("/", controller.addNote); // POST /notes
router.put("/:id", controller.updateNote); // PUT  /notes/:id
router.delete("/:id", controller.deleteNote); // DELETE /notes/:id

module.exports = router;
