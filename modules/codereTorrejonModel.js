const mongoose = require("mongoose");

const CodereTorrejonNumbersSchema = mongoose.Schema({

  numero: {
    type: Number,
    required: true,
  },

});

const CodereTorrejonNumbers = mongoose.model("codereTorrejon", CodereTorrejonNumbersSchema);

module.exports = CodereTorrejonNumbers;
