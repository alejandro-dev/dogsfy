import jwt from 'jsonwebtoken';
import createError from 'http-errors';

// Generar token de inicio de sesión
/**
 * Function to generate a JWT token.
 * 
 * This function generates a JWT token with the given parameters.
 * 
 * @async
 * @function
 * @param {string} id - The user id.
 * @param {string} email - The user email.
 * @param {string} hemisphere - The user hemisphere.
 * @param {string} createdAt - The user creation date.
 * @returns {string} The generated JWT token.
 */
export const generateJWT = (id: string, email: string, hemisphere: string, createdAt: string): string => { 
    // If the JWT secret is not set, throw an error
    if (!process.env.JWT_SECRET) throw createError(500, 'Not configured JWT secret');

    // Generate the JWT token
    const token = jwt.sign({
        email, 
        createdAt,
        id,
        hemisphere
    }, 
    process.env.JWT_SECRET,
    {
        expiresIn: '5h'
    });

    // Return the token
    return token;
}