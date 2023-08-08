const express = require("express");
const usersRouter = express.Router();
const userController = require("../controllers/UserController")
const auth = require('../middlewares/auth')


usersRouter.get('/', userController.getUsers);
usersRouter.get("/me", auth.checkIfAuth, userController.getUserProfile);
usersRouter.post("/login", userController.loginUser);
usersRouter.get('/:userId', userController.getUser);
usersRouter.post("/", userController.addUser);
usersRouter.patch("/admin/:userId", auth.checkIfAuth, userController.updateUser);
usersRouter.put("/:userId", userController.putUser);
usersRouter.patch("/updateUser", auth.checkIfAuth, userController.updateUserConfig);
usersRouter.delete("/:userId", userController.deleteUser);





module.exports = usersRouter