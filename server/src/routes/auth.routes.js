import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/signup',
    body('username')
        .notEmpty()
        .withMessage('Username cannot be empty')
        .isLength({ min: 3, max: 10 })
        .withMessage('Username must be between 3 and 10 characters'),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('fullName')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ max: 20 })
        .withMessage('Password must be between 5 and 32 characters'),
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email is invalid'),
    signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;