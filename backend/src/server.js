const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { connectToDatabase } = require('./config/db.js');

const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const nameRouter = require('./routes/name.route.js');
const { requestLogging } = require('./middlewares/logging.middleware.js');

const app = express();

/** CONFIGURATIONS */
app.use(express.json());
app.use(cookieParser());
app.use(cors());

/** MIDDLEWARES */
app.use(requestLogging);

/** ROUTERS */
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/name', nameRouter);

async function start() {
    await connectToDatabase();

    app.listen(process.env.PORT, async () =>  {
        console.log(`server started at ${process.env.BACKEND_BASE_URL}`);
    });
}

/** START THE SERVER */
start();