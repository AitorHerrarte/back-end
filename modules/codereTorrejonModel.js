const mongoose = require("mongoose");

const NumbersSchema = mongoose.Schema({

  numero: {
    type: Number,
    required: true,
  },

});

const Numbers = mongoose.model("numbers", NumbersSchema);


module.exports = Numbers;
