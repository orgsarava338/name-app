import express from "express";

import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware.js";
import { createName, deleteName, getAllNames, getName, updateName } from "../controllers/name.controller.js";

const nameRouter = express.Router();

/** PUBLIC */
nameRouter.get('/', getAllNames);
nameRouter.get('/:id', getName);

/** ADMIN */
nameRouter.post('/', verifyToken, authorizeRoles('ADMIN'), createName);
nameRouter.put('/:id', verifyToken, authorizeRoles('ADMIN'), updateName);
nameRouter.delete('/:id', verifyToken, authorizeRoles('ADMIN'), deleteName);


export default nameRouter;