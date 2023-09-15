const User = require("../modules/userModel");
const Notes = require("../modules/notesModel");
const { userInfo } = require("os");

const NotesController = {
  getNotes: async (req, res) => {
    try {
      const getData = await Notes.find();
      res.json(getData);
    } catch (error) {
      res.status(500).json({
        error: "error al obtener todas las Notes",
      });
    }
  },
  deleteNoteById: async (req, res) => {
    const { noteId } = req.params;
    try {
      await Notes.findByIdAndRemove({ _id: noteId });
      const user = await User.findOne({ notes: noteId });
      user.notes.pull(noteId);
      await user.save();
      res.json("la nota ha sido eliminada");
    } catch (error) {
      res.status(500).json({
        error: "error al eliminar la nota",
        error,
      });
    }
  },
  addNoteToUser: async (req, res) => {
    try {
      const user = await User.findById(req.userInfo.id).populate("notes");
      console.log(req.userInfo.id, "hola");
      const { description } = req.body;
      console.log("soy req.body", req.body);

      const newNote = new Notes({
        description,
      });

      await newNote.save();
      user.notes.push(newNote);
      await user.save();
      res.status(200).json({
        message: "nota añadida correctamente",
      });
    } catch (error) {
      res.status(500).json({
        error: "error al agregar la nota",
      });
    }
  },
  updateNote: async (req, res) => {
    const { noteId } = req.params;
    try {
      await Notes.findByIdAndUpdate({ _id: noteId }, { ...req.body });
    } catch (error) {
      res.status(500).json({
        error: "error al modificar tu nota",
        error,
      });
    }
  },
  addNote: async (req, res) => {
    const { description } = req.body;
    try {
      const newNote = new Notes({
        description,
      });

      await newNote.save();
      res.json({ message: "nota creada con exito" });
    } catch (error) {
      res.status(500).json({
        error: "error al añadir la nota",
        error,
      });
    }
  },
  getNotesOfUser: async (req, res) => {
    try {
      const user = await User.findById(req.userInfo.id).populate("notes");
      const notes = user.notes;
      res.json(notes);
    } catch (error) {
      res.status(500).json({
        error: "no se pudieron obtener las notas del usuario",
        error,
      });
    }
  },
};

module.exports = NotesController;
