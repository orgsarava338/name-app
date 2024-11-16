const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session')
const { rateLimit } = require('express-rate-limit');
const lusca = require('lusca');

const { connectToDatabase } = require('./config/db.js');

const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const nameRouter = require('./routes/name.route.js');
const { requestLogging } = require('./middlewares/logging.middleware.js');

const app = express();

const limitter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    resave: true,
    saveUninitialized: true,
    message: 'requests were crossed the limit 100. Please try again sometime'
})

/** CONFIGURATIONS */
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(limitter)
app.use(session({secret: process.env.SESSION_SECRET, cookie: {maxAge: 60000, secure: true, httpOnly: true}}))
app.use(lusca.csrf())

/** MIDDLEWARES */
// app.use(requestLogging);

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