const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({

  description: {
    type: String,
    required: true,
  },

});

const Notes = mongoose.model("notes", NotesSchema);

module.exports = Notes;
