import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import userRepository from '../repositories/userRepository';

/**
 * Middleware that checks if a user exists by username.
 * 
 * This middleware checks if a user exists by username in the database.
 * @param {Request} req - The request object. Contains the username in `req.body.username`.
 * @param {Response} _res - The response object (unused in this middleware).
 * @param {NextFunction} next - The function to pass to the next middleware.
 * @returns {Promise<void>} Resolves when the username is checked and the response is sent.
 * @throws {Error} If there is any error during the process, it will be passed to the next middleware.
 */
const existByUsername = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        // We collect the username
        const { username } = req.body;

        // We call the user repository. We only select the id and username
        const user = await userRepository.findUserFromUsername('id, username', username);

        // If the user exists and the id is different from the current user, we return a 409 Conflict error
        if(user && user.id !== req.params.id) next(createError(409, 'The usernaem already exists'));

        // We continue to the next middleware
        next();

    } catch (error) {
        // We return the error to the next middleware
        next(createError(500, 'Error while checking the username'));
    }
} 

/**
 * Middleware that checks if a user exists by email.
 * 
 * This middleware checks if a user exists by email in the database.
 * @param {Request} req - The request object. Contains the email in `req.body.email`.
 * @param {Response} _res - The response object (unused in this middleware).
 * @param {NextFunction} next - The function to pass to the next middleware.
 * @returns {Promise<void>} Resolves when the email is checked and the response is sent.
 * @throws {Error} If there is any error during the process, it will be passed to the next middleware.
 */
const existByEmail = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        // We collect the email
        const { email } = req.body;

        // We call the user repository. We only select the email
        const user = await userRepository.findUserFromEmail('email', email);

        // If the user exists, we return a 409 Conflict error
        if(user) next(createError(409, 'Email already exists'));

        // We continue to the next middleware
        next();

    } catch (error) {
        // We return the error to the next middleware
        next(createError(500, 'Error while checking the email'));
    }
} 

/**
 * Middleware that checks if a user exists by id.
 * 
 * This middleware checks if a user exists by id in the database.
 * @param {Request} req - The request object. Contains the id in `req.params.id`.
 * @param {Response} _res - The response object (unused in this middleware).
 * @param {NextFunction} next - The function to pass to the next middleware.
 * @returns {Promise<void>} Resolves when the id is checked and the response is sent.
 */
const existById = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        // We collect the user id from req.params
        const { id, friendId } = req.params;

        // We select the id to validate
        let selectedId = '';
        if(id) selectedId = id;
        if(friendId) selectedId = friendId;

        // We consult the user hemisphere
        const hemisphere = selectedId.charAt(0);

        // We call the user repository.
        const user = await userRepository.findUserFromId(selectedId, hemisphere);

        // If the user does not exist, we return a 404 Not Found error
        if(!user) next(createError(404, 'Not found user'));

        // We continue to the next middleware
        next();
        
    } catch (error) {
        // We return the error to the next middleware
        next(createError(500, 'Server error'));
    }
} 

export default {
    existByUsername,
    existByEmail,
    existById
}