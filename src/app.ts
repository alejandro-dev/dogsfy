import express from 'express';
import dotenv from 'dotenv';
import { AuthRoutes, FriendsRoutes, UsersRoutes } from './routes/index'
import morgan from 'morgan';
import { notFoundHandler } from './middlewares/notFoundHandler';
import errorHandler from './middlewares/errorHandler';
import { setupSwagger } from './config/swaggerConfig';

// Add environment variables
dotenv.config();

// Create the app
var app = express();

// Configure morgan to log HTTP requests
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms',
        'Body:', JSON.stringify(req.body),
    ].join(' ');
}));

// Configure Swagger
setupSwagger(app);

// Configure JSON and URL-encoded body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Group routes
const apiRouter = express.Router();

// Declare routes
apiRouter.use('/auth', AuthRoutes);
apiRouter.use('/users', UsersRoutes);
apiRouter.use('/friends', FriendsRoutes);

// Add the apiRouter to the app
app.use('/api', apiRouter);

// Middleware for routes not found
app.use(notFoundHandler);

// Middleware for errors
app.use(errorHandler);

export default app;