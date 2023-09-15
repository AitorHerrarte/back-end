const express = require("express");
const notesRouter = express.Router();
const notesController = require("../controllers/NotesController")
const auth = require('../middlewares/auth')

notesRouter.get('/', notesController.getNotes);
notesRouter.delete("/:noteId", notesController.deleteNoteById);
notesRouter.post("/addNoteToUser", auth.checkIfAuth, notesController.addNoteToUser);
notesRouter.patch("/:noteId", auth.checkIfAuth, notesController.updateNote);
notesRouter.post("/addNote", auth.checkIfAuth, notesController.addNote);
notesRouter.get("/myNotes", auth.checkIfAuth, notesController.getNotesOfUser)

module.exports = notesRouter