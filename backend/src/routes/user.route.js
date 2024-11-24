const express = require("express");

const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware.js');
const { createUser, deleteUser, getAllUsers, getUser } = require("../controllers/user.controller.js");

const userRouter = express.Router();

/** MIDDLEWARES */
userRouter.use(verifyToken);

/** ADMIN */
userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:username', getUser);
userRouter.delete('/:username', deleteUser);

module.exports = userRouter;