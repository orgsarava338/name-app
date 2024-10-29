import express from "express";

import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware.js";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

/** MIDDLEWARES */
userRouter.use(verifyToken);

/** USER */
userRouter.put('/:id_username', updateUser);
userRouter.delete('/:id_username', deleteUser);

/** ADMIN */
userRouter.get('/', authorizeRoles('ADMIN'), getAllUsers);
userRouter.post('/', authorizeRoles('ADMIN'), createUser);
userRouter.get('/:id_username', authorizeRoles('ADMIN'), getUser);
userRouter.put('/:id_username', authorizeRoles('ADMIN'), updateUser);
userRouter.delete('/:id_username', authorizeRoles('ADMIN'), deleteUser);

export default userRouter;