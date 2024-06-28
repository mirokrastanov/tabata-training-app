import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
dotenv.config();

const sessionConfig = session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // does not save unless req.body was modified - for example the expiration date doesnt update each time
    // a user logs in, therefore the original 15days remain no matter how many times the user logs in
    saveUninitialized: false, // does not save automatically, but only if the session data object is modified
    // passport.js does modify the session data object so there is no need for a middleware with req.session.visited
    // req.session.visited = true; // will be responsible for that - to be set in a middleware
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days (in milliseconds)
    },
    store: MongoStore.create({ // store session data in MongoDB and restores it on server startup
        mongoUrl: process.env.MONGO_DB_URI,
    }),
});

export default sessionConfig;