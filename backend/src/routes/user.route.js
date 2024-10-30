import express from "express";

import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

/** MIDDLEWARES */
userRouter.use(verifyToken);

/** USER */
userRouter.put('/:username', updateUser);
userRouter.delete('/:username', deleteUser);

/** ADMIN */
userRouter.post('/', authorizeRoles('ADMIN'), createUser);
userRouter.get('/', authorizeRoles('ADMIN'), getAllUsers);
userRouter.get('/:username', authorizeRoles('ADMIN'), getUser);
userRouter.put('/:username', authorizeRoles('ADMIN'), updateUser);
userRouter.delete('/:username', authorizeRoles('ADMIN'), deleteUser);

export default userRouter;