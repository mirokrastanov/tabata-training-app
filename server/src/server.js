import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes.js';
import connectToMongoDB from './config/mongoDB.js';
import sessionConfig from './config/sessionConfig.js';
import passport from 'passport';
import { localStrategy, discordStrategy } from './config/passporConfig.js';
import { preRoutesErrorHandler } from './middlewares/errorHandlers.middleware.js';
import { allowCORS } from './middlewares/allowCORS.middleware.js';
import { attachPublicPath } from './middlewares/attachPublicPath.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Allows CORS
app.use(allowCORS);

// Body parsers
app.use(express.urlencoded({ extended: false })); // parse form fields
app.use(express.json()); // parse JSON from incoming requests (req.body)

// Static files
const currentDir = process.cwd();
const publicPath = path.resolve(currentDir, 'public');
app.use(attachPublicPath(publicPath)); // attach req.publicPath
app.use('/assets', express.static(publicPath));
// External requests (real use):    /assets + file (relative) 
//             Internal use:     publicPath + file (full path)

// Cookie parser
app.use(cookieParser());

// Server sessions
app.use(sessionConfig);

// Passport.js
passport.use(localStrategy);
passport.use(discordStrategy);
app.use(passport.initialize()); // adds req.login, req.logout, etc
app.use(passport.session());

// Pre-routes error handler
app.use(preRoutesErrorHandler);

// Routes
app.use(routes);

// Connect to DB and Run Server
connectToMongoDB()
    .then(() => app.listen(PORT, () => console.log(`The server is running on port ${PORT}...`)))
    .catch((error) => console.log(`Could not start the server. Error: ${error}`));

