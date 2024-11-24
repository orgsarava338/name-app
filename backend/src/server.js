const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session')
const { rateLimit } = require('express-rate-limit');
const lusca = require('lusca');
const MongoStroe = require('connect-mongo')

const { connectToDatabase } = require('./config/db.js');

const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const nameRouter = require('./routes/name.route.js');
const commentRouter = require('./routes/comment.route.js');

const app = express();

const limitter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    resave: false,
    saveUninitialized: true,
    message: 'requests were crossed the limit 1000 / 15 mins. Please try again sometime'
})

const corsOptions = {
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'X-CSRF-TOKEN'],
}

/** CONFIGURATIONS */
app.use(express.json());
app.use(cookieParser());
app.use(limitter)
app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    store: MongoStroe.create({ mongoUrl: process.env.MONGO_DB_URL, ttl: 60 * 60 * 24 /* 24 hour session */, }),
    cookie: { maxAge: 60 * 60 * 1000 /** 1 hour */, httpOnly: true, secure: true, saneSite: 'strict' },
}))

app.use(lusca.csrf())

/** MIDDLEWARES */
app.options('*', cors());

// Session management
app.use((req, res, next) => {
    if (!req.session.views) {
        req.session.views = 0;
    }
    req.session.views++;
    next();
});

// CSRF token setup
app.use((req, res, next) => {
    if (!req.session._csrf) req.session._csrf = req.csrfToken();
    res.cookie("XSRF-TOKEN", req.session._csrf, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
    });

    next();
});

// app.use((req, res, next) => {
//     const receivedToken = req.headers['x-csrf-token'];
//     const expectedToken = req.session._csrf;

//     console.log("Received CSRF Token:", receivedToken);
//     console.log("Expected CSRF Token:", expectedToken);

//     if (receivedToken !== expectedToken) {
//         return res.status(403).json({ error: "CSRF token mismatch" });
//     }
//     next();
// });

/** ROUTERS */
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/name', nameRouter);
app.use('/api/comment', commentRouter)

async function start() {
    await connectToDatabase();

    app.listen(process.env.PORT, async () =>  {
        console.log(`server started at ${process.env.BACKEND_BASE_URL}`);
    });
}

/** START THE SERVER */
start();