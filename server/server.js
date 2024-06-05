import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

// Body parsers
app.use(express.urlencoded({ extended: false })); // parse form fields
app.use(express.json()); // parse JSON from incoming requests (req.body)

// TODO: Cookie parsers
app.use(cookieParser());

// TODO: Auth middleware

// TODO: Routes

// TODO: Error handler

// Routes 
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/auth', authRoutes);



// Wildcard route
app.get('*', (req, res) => {
    console.log('404');
});

// Run Server
app.listen(PORT, () => {
    // console.log(process.env.PORT);
    console.log(`The server is running on port: ${PORT}`);
});

