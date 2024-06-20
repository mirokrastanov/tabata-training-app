import express from 'express';
import { authStatus, getUser, getUsers, login, logout, signup } from '../controllers/auth.controller.js';
import passport from "passport";
import '../config/passporConfig.js';

const router = express.Router();

router.get('/get-users', getUsers);
router.get('/get-user/:id', getUser);
router.get('/status', authStatus);

router.post('/signup', signup);
router.post('/login', passport.authenticate('local'), login);
router.post('/logout', logout);

export default router;