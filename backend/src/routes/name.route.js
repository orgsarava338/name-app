const express = require("express");

const { authorizeRoles, verifyToken } = require("../middlewares/auth.middleware.js");
const { createName, deleteName, getAllNames, getName, updateName } = require("../controllers/name.controller.js");
const { verifyId } = require("../middlewares/mongo.middleware.js");

const nameRouter = express.Router();

/** PUBLIC */
nameRouter.get('/', getAllNames);
nameRouter.get('/:searchText', getAllNames);
nameRouter.get('/:id', verifyId, getName);

/** ADMIN */
nameRouter.post('/', verifyToken, authorizeRoles('ADMIN'), createName);
nameRouter.put('/:id', verifyId, verifyToken, authorizeRoles('ADMIN'), updateName);
nameRouter.delete('/:id', verifyId, verifyToken, authorizeRoles('ADMIN'), deleteName);

module.exports = nameRouter;