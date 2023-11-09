// En NumbersController.js

const Quantum = require("../modules/quantumModel");

const NumbersController = {
  getNumbers: async (req, res) => {
    try {
      const allNumbers = await Quantum.find();
      res.json(allNumbers);
    } catch (error) {
      console.error("Error al obtener los números:", error);
      res.status(500).json({ error: "Error al obtener los números" });
    }
  },

  addNumber: async (req, res) => {
    const { numero } = req.body;

    try {
      const newNumber = new Quantum({
        numero,
      });

      await newNumber.save();
      res.json({ message: "Número añadido con éxito" });
    } catch (error) {
      console.error("Error al añadir el número:", error);
      res.status(500).json({ error: "Error al añadir el número" });
    }
  },

  getAllNextNumbers: async (req, res) => {
    try {
      const allNumbers = await Quantum.find();
      const nextNumbersMap = {};

      allNumbers.forEach((num, index, array) => {
        if (index < array.length - 1) {
          const currentNumber = num.numero;
          const nextNumber = array[index + 1].numero;

          if (!nextNumbersMap[currentNumber]) {
            nextNumbersMap[currentNumber] = [];
          }

          nextNumbersMap[currentNumber].push(nextNumber);
        }
      });

      res.json({ allNextNumbers: nextNumbersMap });
    } catch (error) {
      console.error("Error al obtener todos los siguientes números:", error);
      res.status(500).json({ error: "Error al obtener todos los siguientes números" });
    }
  },

  getNextNumbers: async (req, res) => {
    const { numero } = req.params;

    try {
      const occurrences = await Quantum.find({ numero });
      const uniqueNextNumbersSet = new Set();

      occurrences.forEach((occurrence, index, array) => {
        if (index < array.length - 1) {
          const nextNumber = array[index + 1].numero;
          uniqueNextNumbersSet.add(nextNumber);
        }
      });

      const uniqueNextNumbersArray = Array.from(uniqueNextNumbersSet);
      res.json({ nextNumbers: uniqueNextNumbersArray });
    } catch (error) {
      console.error("Error al obtener los siguientes números:", error);
      res.status(500).json({ error: "Error al obtener los siguientes números" });
    }
  },


};

module.exports = NumbersController;
