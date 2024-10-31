import express from "express";

import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js'
import { createUser, deleteUser, getAllUsers, getUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

/** MIDDLEWARES */
userRouter.use(verifyToken);

/** ADMIN */
userRouter.post('/', authorizeRoles('ADMIN'), createUser);
userRouter.get('/', authorizeRoles('ADMIN'), getAllUsers);
userRouter.get('/:username', authorizeRoles('ADMIN'), getUser);
userRouter.delete('/:username', authorizeRoles('ADMIN'), deleteUser);

export default userRouter;