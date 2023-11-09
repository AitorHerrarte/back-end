// En numbersRoute.js

const express = require("express");
const NumbersController = require("../controllers/CodereTorrejonController");

const numbersRouter = express.Router();

numbersRouter.get('/', NumbersController.getNumbers);
numbersRouter.post("/addNumber", NumbersController.addNumber);
numbersRouter.get('/getAllNextNumbers/:numero', NumbersController.getAllNextNumbers);
numbersRouter.get('/getNextNumbers/:numero', NumbersController.getNextNumbers);

module.exports = numbersRouter;
