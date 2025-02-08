import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';

/**
 * Middleware function to handle 404 Not Found errors.
 * 
 * This function catches 404 Not Found errors and returns a JSON response with the appropriate status code and message.
 * 
 * @function
 * @param {Request} req - The request object.
 * @param {Response} _res - The response object (unused in this function).
 * @param {NextFunction} next - The function to pass control to the next middleware or route handler.
 * @returns {void} This function doesn't return anything but sends a JSON response with the error details.
 */
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
    // If the error is not a 404 Not Found error, pass it to the next middleware
    next(createError(404, `Path ${req.originalUrl} does not exist`));
};
