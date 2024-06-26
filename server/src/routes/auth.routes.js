import express from 'express';
import { authStatus, getUser, getUsers, isAuth, login, logout, signup } from '../controllers/auth.controller.js';
import passport from 'passport';

const router = express.Router();

router.get('/get-users', getUsers);
router.get('/get-user/:id', getUser);
router.get('/status', authStatus);
router.get('/is-auth', isAuth);

router.post('/signup', signup);
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // console.log(err, '<--0-->', user, '<--0-->', info);
        if (err) {
            return next({ error: "Internal Server Error", msg: err.message });
        }
    })(req, res, next);
}, (err, req, res, next) => {
    console.log(err);
    res.json(err);
}, login);
router.post('/logout', logout);

export default router;