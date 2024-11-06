const express = require("express");

const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware.js');
const { createUser, deleteUser, getAllUsers, getUser } = require("../controllers/user.controller.js");

const userRouter = express.Router();

/** MIDDLEWARES */
userRouter.use(verifyToken);

/** ADMIN */
userRouter.post('/', authorizeRoles('ADMIN'), createUser);
userRouter.get('/', authorizeRoles('ADMIN'), getAllUsers);
userRouter.get('/:username', authorizeRoles('ADMIN'), getUser);
userRouter.delete('/:username', authorizeRoles('ADMIN'), deleteUser);

module.exports = userRouter;