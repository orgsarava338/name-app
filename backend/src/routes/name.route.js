const express = require("express");

const { authorizeRoles, verifyToken } = require("../middlewares/auth.middleware.js");
const { createName, deleteName, getAllNames, getName, updateName } = require("../controllers/name.controller.js");

const nameRouter = express.Router();

/** PUBLIC */
nameRouter.get('/', getAllNames);
nameRouter.get('/:name', getName);

/** ADMIN */
nameRouter.post('/', createName);
nameRouter.put('/:name', updateName);
nameRouter.delete('/:name', deleteName);

module.exports = nameRouter;