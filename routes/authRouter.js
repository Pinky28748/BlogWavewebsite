const express = require('express');
const authRouter = express.Router();
const userController = require('../controller/userController');

authRouter.get("/register",userController.getRegister);
authRouter.post("/register",userController.postRegister);
authRouter.get("/login",userController.getLogin);
authRouter.post("/login",userController.postLogin);
authRouter.get("/logout",userController.getLogout);




module.exports = authRouter;