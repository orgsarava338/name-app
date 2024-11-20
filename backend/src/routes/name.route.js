const express = require("express");

const { authorizeRoles, verifyToken } = require("../middlewares/auth.middleware.js");
const { createName, deleteName, getAllNames, getName, updateName } = require("../controllers/name.controller.js");
const { verifyId } = require("../middlewares/mongo.middleware.js");

const nameRouter = express.Router();

/** PUBLIC */
nameRouter.get('/', getAllNames);
nameRouter.get('/:name', getName);

/** ADMIN */
nameRouter.post('/', verifyToken, authorizeRoles('admin'), createName);
nameRouter.put('/:name', verifyId, verifyToken, authorizeRoles('admin'), updateName);
nameRouter.delete('/:name', verifyId, verifyToken, authorizeRoles('admin'), deleteName);

module.exports = nameRouter;