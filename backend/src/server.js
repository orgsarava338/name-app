import express from 'express';
import dotenv from 'dotenv';

import { connectToDatabase } from './config/db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import nameRouter from './routes/name.route.js';

dotenv.config();

const PORT = process.env.PORT;
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

const app = express();

/** CONFIGURATIONS */
app.use(express.json());

/** ROUTERS */
app.use('api/auth', authRouter);
app.use('api/user', userRouter);
app.use('api/name', nameRouter);

/** START THE SERVER */
app.listen(PORT, async () =>  {
    await connectToDatabase()
    console.log(`server started at ${BACKEND_BASE_URL}`)
})