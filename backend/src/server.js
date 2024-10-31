import express from 'express';
import dotenv from 'dotenv';

import { connectToDatabase } from './config/db.js';

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import nameRouter from './routes/name.route.js';
import { requestLogging } from './middlewares/logging.middleware.js';

dotenv.config();

const app = express();

/** CONNECT TO DB */
await connectToDatabase();

/** CONFIGURATIONS */
app.use(express.json());

/** MIDDLEWARES */
app.use(requestLogging);

/** ROUTERS */
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/name', nameRouter);

/** START THE SERVER */
app.listen(process.env.PORT, async () =>  {
    console.log(`server started at ${process.env.BACKEND_BASE_URL}`);
});