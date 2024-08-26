import { z } from 'zod';

const fullNameMAX = 20;
const usernameMIN = 3;
const usernameMAX = 10;
const passwordMIN = 6;

export const signUpSchema = z
    .object({
        fullName: z.string()
            .min(1, 'Full Name is required')
            .max(fullNameMAX, `Full Name must be ${fullNameMAX} or fewer characters`),
        username: z.string()
            .min(1, 'Username is required')
            .min(usernameMIN, `Username must be ${usernameMIN} or more characters`)
            .max(usernameMAX, `Username must be ${usernameMAX} or fewer characters`),
        email: z.string()
            .min(1, 'Email is required')
            .email('Must be a valid email'),
        password: z.string()
            .min(1, 'Password is required')
            .min(passwordMIN, `Password must be ${passwordMIN} or more characters`),
        confirmPassword: z.string()
            .min(1, 'Confirm Password is required')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

export const signInSchema = z.object({
    username: z.string()
        .min(1, 'Username is required')
        .min(usernameMIN, `Username must be ${usernameMIN} or more characters`)
        .max(usernameMAX, `Username must be ${usernameMAX} or fewer characters`),
    password: z.string()
        .min(1, 'Password is required')
        .min(passwordMIN, `Password must be ${passwordMIN} or more characters`),
});
