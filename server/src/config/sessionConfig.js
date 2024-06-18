import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const sessionConfig = session({
    secret: process.env.JWT_SECRET,
    resave: false, // does not save unless req.body was modified
    saveUninitialized: false, // does not save automatically
    // req.session.visited = true; // will be responsible for that - to be set in a middleware
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    },
});

export default sessionConfig;