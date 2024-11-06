import express from "express";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { login, logoff, register } from "../controllers/auth.controller.js";

const authRouter = express.Router();

/** PUBLIC */
authRouter.post('/register', register);
authRouter.post('/login', login);

/** USER */
authRouter.post('/logoff', verifyToken, logoff);

export default authRouter;