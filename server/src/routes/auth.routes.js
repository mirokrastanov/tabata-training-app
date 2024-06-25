import express from 'express';
import { authStatus, getUser, getUsers, isAuth, login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/get-users', getUsers);
router.get('/get-user/:id', getUser);
router.get('/status', authStatus);
router.get('/is-auth', isAuth);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;