// En numbersRoute.js

const express = require("express");
const QuantumController = require("../controllers/QuantumController");

const quantumRouter = express.Router();

quantumRouter.get('/', QuantumController.getNumbers);
quantumRouter.post("/addNumber", QuantumController.addNumber);
quantumRouter.get('/getAllNextNumbers/:numero', QuantumController.getAllNextNumbers);
quantumRouter.get('/getNextNumbers/:numero', QuantumController.getNextNumbers);

module.exports = quantumRouter;
