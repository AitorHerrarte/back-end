const mongoose = require("mongoose");

const QuantumSchema = mongoose.Schema({

  numero: {
    type: Number,
    required: true,
  },

});

const Quantum = mongoose.model("quantum", QuantumSchema);


module.exports = Quantum;
