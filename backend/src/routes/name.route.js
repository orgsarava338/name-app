import express from "express";

import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware.js";
import { createName, deleteName, getAllNames, getName, updateName } from "../controllers/name.controller.js";
import { isValidMongooseId } from "../middlewares/mongo.middleware.js";

const nameRouter = express.Router();

/** PUBLIC */
nameRouter.get('/', getAllNames);
nameRouter.get('/:id', isValidMongooseId, getName);

/** ADMIN */
nameRouter.post('/', verifyToken, authorizeRoles('ADMIN'), createName);
nameRouter.put('/:id', isValidMongooseId, verifyToken, authorizeRoles('ADMIN'), updateName);
nameRouter.delete('/:id', isValidMongooseId, verifyToken, authorizeRoles('ADMIN'), deleteName);

export default nameRouter;