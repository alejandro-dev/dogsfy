import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import createError from 'http-errors';

// Función para verificar el token
/**
 * Middleware function to authenticate the user by verifying the JWT token.
 * 
 * This function checks if a valid JWT token is provided in the `Authorization` header. 
 * It performs the following steps:
 * 1. Retrieves the JWT token from the `Authorization` header.
 * 2. Verifies the token using the secret stored in `process.env.JWT_SECRET`.
 * 3. If the token is valid, it extracts the user ID from the token and attaches it to `req.user`.
 * 4. If the token is missing or invalid, it returns a 401 Unauthorized error.
 * 
 * If the token is valid, it allows the request to proceed to the next middleware or route handler.
 * If there are any issues with the token, it sends an error response with the corresponding status code.
 * 
 * @async
 * @function
 * @param {Request} req - The request object, which may contain the JWT token in the `Authorization` header.
 * @param {Response} res - The response object used to send error responses if the token is invalid.
 * @param {NextFunction} next - The function to pass control to the next middleware or route handler if the token is valid or if an error occurs.
 * @returns {Promise<void>} Resolves when the token is verified and the user ID is attached to `req.user`.
 */
const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Retrieve the bearer token from the Authorization header
        const bearerToken = req.get('Authorization');

        // If the token is missing, return an error
        if(!bearerToken) return next(createError(401, 'Not authenticated, no jwt'));

        // Extract the token from the 'Bearer <token>' format
        const token = bearerToken.split(' ')[1];
        let reviewToken;

        // Verify the token using the secret from the environment
        reviewToken = jwt.verify(token, String(process.env.JWT_SECRET));

        // Ensure the token is a valid object
        if (typeof reviewToken !== 'object' || reviewToken === null) next(createError(401, 'Invalid token'));

        // Attach the user ID to the request object
        if (!req.user) req.user = { id: '' }; 
        req.user = { id: (reviewToken as JwtPayload).id };

        // Go to the next middleware or route handler
        next();
        
    } catch (error: any) {
        // Validate if the error is for tu expiration token
        if(error.name === 'TokenExpiredError') return next(createError(401, 'Token expired'));
        
        // If there was an error during token verification, pass it to the next middleware
        next(createError(500, 'Server error'));
    }
}

export default authenticateToken;