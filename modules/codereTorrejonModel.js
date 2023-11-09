const mongoose = require("mongoose");

const NumbersSchema = mongoose.Schema({

  numero: {
    type: Number,
    required: true,
  },

});

const Numbers = mongoose.model("codereTorrejon", NumbersSchema);

module.exports = Numbers;
