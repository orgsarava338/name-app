const express = require("express");

const { verifyToken } = require("../middlewares/auth.middleware.js");
const { login, logoff, register } = require("../controllers/auth.controller.js");

const authRouter = express.Router();

/** PUBLIC */
authRouter.post('/register', register);
authRouter.post('/login', login);

/** USER */
authRouter.post('/logoff', verifyToken, logoff);

module.exports = authRouter;