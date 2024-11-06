import express from "express";

import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware.js";
import { createName, deleteName, getAllNames, getName, updateName } from "../controllers/name.controller.js";
import { verifyId } from "../middlewares/mongo.middleware.js";

const nameRouter = express.Router();

/** PUBLIC */
nameRouter.get('/', getAllNames);
nameRouter.get('/:id', verifyId, getName);

/** ADMIN */
nameRouter.post('/', verifyToken, authorizeRoles('ADMIN'), createName);
nameRouter.put('/:id', verifyId, verifyToken, authorizeRoles('ADMIN'), updateName);
nameRouter.delete('/:id', verifyId, verifyToken, authorizeRoles('ADMIN'), deleteName);

export default nameRouter;