const express = require("express");

const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware.js');
const { createUser, deleteUser, getAllUsers, getUser } = require("../controllers/user.controller.js");

const userRouter = express.Router();

/** MIDDLEWARES */
userRouter.use(verifyToken);

/** ADMIN */
userRouter.post('/', authorizeRoles('admin'), createUser);
userRouter.get('/', authorizeRoles('admin'), getAllUsers);
userRouter.get('/:username', authorizeRoles('admin'), getUser);
userRouter.delete('/:username', authorizeRoles('admin'), deleteUser);

module.exports = userRouter;