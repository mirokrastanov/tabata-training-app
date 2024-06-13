import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes.js';
import connectToMongoDB from './config/mongoDB.js';
import sessionConfig from './config/sessionConfig.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Body parsers
app.use(express.urlencoded({ extended: false })); // parse form fields
app.use(express.json()); // parse JSON from incoming requests (req.body)

// Cookie parser
app.use(cookieParser());

// Server sessions
app.use(sessionConfig);

// Routes
app.use(routes);

// Connect to DB and Run Server
connectToMongoDB()
    .then(() => app.listen(PORT, () => console.log(`The server is running on port ${PORT}...`)))
    .catch((error) => console.log(`Error connecting to MongoDB: ${error}`));

