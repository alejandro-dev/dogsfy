import createError from 'http-errors';
import userRepository from '../repositories/userRepository';
import { comparePassword } from '../utils/comparePassword';
import { generateJWT } from '../utils/generateJWT';

/**
 * Function to login a user.
 * 
 * This function logs in a user by email and password and generates a JWT token.
 * 
 * @async
 * @function
 * @param {string} email - The email of the user to log in.
 * @param {string} password - The password of the user to log in.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const login = async (email: string, password: string): Promise<any> => {
    try {
        // We query the user by email
        const user = await userRepository.findUserFromEmail('id, email, password', email);

        // If the user does not exist or the role is not populated correctly, throw a 404 Not Found error
        if (!user) throw createError(404, 'User or password incorrect');

        // We check the password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw createError(404, 'User or password incorrect');

        // We generate the token
        const token = generateJWT(user.id, user.email, user.hemisphere, user.createdAt);

        // We delete the password from the user object
        delete user.password;

        // Return the response
        return { status: 'success', message: 'Session successfully logged in', data: { token, user} }

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
        
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
    }
}

export default {
    login,
}