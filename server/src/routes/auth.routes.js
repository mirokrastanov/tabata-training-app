import express from 'express';
import passport from 'passport';
import guestRoute from '../middlewares/guestRoute.middleware.js';
import userRoute from '../middlewares/userRoute.middleware.js';
import adminRoute from '../middlewares/adminRoute.middleware.js';
import discordRedirect from '../middlewares/discordRedirect.middleware.js';
import {
    authStatus, getUser, getUsers, login, logout, signup
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/status', authStatus);

router.post('/signup', guestRoute, signup);
router.post('/login', guestRoute, login);
router.post('/logout', userRoute, logout);

router.get('/discord/login', guestRoute, passport.authenticate('discord')); // when authorized - returns query param
router.get('/discord/redirect', guestRoute, discordRedirect, login); // use query param to get accessToken and proceed

// For future Front End Admin Access
router.get('/get-users', adminRoute, getUsers);
router.get('/get-user/:id', adminRoute, getUser);

export default router;