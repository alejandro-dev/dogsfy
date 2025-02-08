import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

/**
 * Middleware function to validate the user id.
 * 
 * This function checks if the user id is a valid UUID. If it is not, it throws a 400 Bad Request error.
 * 
 * @function
 * @param {Request} req - The request object containing the user id in `req.params.id`.
 * @param {Response} _res - The response object (unused in this function).
 * @param {NextFunction} next - The function to pass control to the next middleware or route handler.
 * @returns {void} This function doesn't return anything but throws a 400 Bad Request error if the id is invalid.
 */
const validateId = (req: Request, _res: Response, next: NextFunction): void => {
    try {
        // We collect the ids
        const { id, friendId } = req.params;

        // We select the id to validate
        let selectedId = '';
        if(id) selectedId = id;
        if(friendId) selectedId = friendId;

        // Regex para validar el id
        const uuidRegex = /^[ns][a-f0-9]{32}$/;

        // Verify if the id is a valid UUID
        if (!uuidRegex.test(selectedId)) return next(createError(400, 'Invalid id'));

        // Continue to the next middleware
        next();

    } catch (error) {
        // We return the error to the next middleware
        next(createError(500, 'Server error'));
    }
    
};

export default validateId;
