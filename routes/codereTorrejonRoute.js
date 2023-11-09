// En numbersRoute.js

const express = require("express");
const CodereTorrejonController = require("../controllers/CodereTorrejonController");

const codereTorrejonRouter = express.Router();

codereTorrejonRouter.get('/', CodereTorrejonController.getNumbers);
codereTorrejonRouter.post("/addNumber", CodereTorrejonController.addNumber);
codereTorrejonRouter.get('/getAllNextNumbers/:numero', CodereTorrejonController.getAllNextNumbers);
codereTorrejonRouter.get('/getNextNumbers/:numero', CodereTorrejonController.getNextNumbers);

module.exports = codereTorrejonRouter;
