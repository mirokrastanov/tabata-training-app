import jwt from '../utils/jwt.js';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;
const TOKEN_KEY = process.env.TOKEN_KEY;


export async function auth(req, res, next) {
    const token = req.cookies[TOKEN_KEY];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            next();
        } catch (err) {
            res.clearCookie(TOKEN_KEY);
            req.user = null;
            res.locals.user = null;
            res.locals.isAuthenticated = false;
            res.send('no-user');
        }
    } else {
        next();
    }
}

export function isAuth(req, res, next) {
    if (!req.user) {
        return res.send('no-user');
    }
    next();
}