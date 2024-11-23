const express = require("express");

const { authorizeRoles, verifyToken } = require("../middlewares/auth.middleware.js");
const { createName, deleteName, getAllNames, getName, updateName } = require("../controllers/name.controller.js");
const { verifyId } = require("../middlewares/mongo.middleware.js");

const nameRouter = express.Router();

/** PUBLIC */
nameRouter.get('/', getAllNames);
nameRouter.get('/:name', getName);

/** ADMIN */
nameRouter.post('/', createName);
nameRouter.put('/:name', verifyId, updateName);
nameRouter.delete('/:name', verifyId, deleteName);

module.exports = nameRouter;