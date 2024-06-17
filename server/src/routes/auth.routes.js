import express from 'express';
import { getUser, getUsers, login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/get-users', getUsers);
router.get('/get-user/:id', getUser);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;