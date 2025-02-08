import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { User } from '../types/user';
import userRepository from '../repositories/userRepository';
import { geoLocation } from '../utils/geoLocation';
import { sendEmailConfirmation } from './sendEmailConfirmation';
import friendsRepository from '../repositories/friendsRepository';

/**
 * Function to register a user.
 * 
 * This function registers a user in the database.
 * 
 * @async
 * @function
 * @param {User} user - The user object to register.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const addUser = async (user: User): Promise<any> => {
    try {
        // We encrypt the password
        const hash = await bcrypt.hash(user.password.toString(), 12);

        // We query to which hemisphere the user belongs
        const hemisphere = await geoLocation(user.lat, user.lng);

        // We generate an id for the user
        const userId = `${hemisphere.toLowerCase()}${uuidv4().replace(/-/g, '')}`;

        // We add the id and the encrypted password to the user object
        const auth = { id: userId, email: user.email, username: user.username, password: hash, hemisphere, lat: user.lat, lng: user.lng, language: user.language } as User;

        // We register the user in the database
        await userRepository.registerUser(auth);

        // We simulate sending an email confirmation
        await sendEmailConfirmation();

        // Return the response
        return { status: 'success', message: 'User registered correctly' };

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
        
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
    }
};

// Consultar un usuario
/**
 * Function to get a user.
 * 
 * This function retrieves a user by id from the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id.
 * @param {string} select - The fields to select.(Optional)
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const getUser = async (userId: string, select?: string): Promise<any> => {
    try {
        // We query the hemisphere
        const hemisphere = userId.charAt(0);

        // We query the user
        const user = await userRepository.findUserFromId(userId, hemisphere, select);

        // Return the response
        return { status: 'success', data: { user } };

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
        
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
    }
};

/**
 * Function to update a user.
 * 
 * This function updates a user by id in the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id.
 * @param {Partial<User>} updatedDataUser - The updated data of the user.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const updateUser = async (userId: string, updatedDataUser: Partial<User>): Promise<any> => {
    try {
        // We check if any changes have been made and if all fields are undefined
        const updatedFields: any = {};

        // We iterate through the updatedDataUser fields and check if there is any data
        for (const [key, value] of Object.entries(updatedDataUser)) {
            if (value !== undefined && key !== undefined) updatedFields[key] = value
        }

        // If no fields have been updated, return a message. We check if there is any key
        if (Object.keys(updatedFields).length === 0) return { status: 'success', message: 'No se han realizado cambios' };

        // We check if we receive a password and if it is, we encrypt it
        if (updatedDataUser.password) {
            updatedFields.password = await bcrypt.hash(updatedFields.password.toString(), 12);
        }


        // We build the dynamic statement
        const fieldsUpdated = [];
        const values = [];

        // We iterate through the updatedFields properties and add them to the query
        for (const key in updatedFields) {
            fieldsUpdated.push(`${key} = ?`);
            values.push(updatedFields[key]);
        }

        // We add the userId to the end of the values array
        values.push(userId);

        // We generate a string for the query and separate the fields to modify by commas
        const query = `UPDATE users SET ${fieldsUpdated.join(', ')} WHERE id = ?`;

        // We query the hemisphere
        const hemisphere = userId.charAt(0);
 
        // We update the user
        await userRepository.updateUser(hemisphere, query, values);

        // Return the response
        return { status: 'success', message: 'User updated correctly' };

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
            
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
    }
};

/**
 * Function to delete a user.
 * 
 * This function deletes a user by id from the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const deleteUser = async (userId: string): Promise<any> => {
    try {
        // We delete all friends of the user
        await friendsRepository.deleteAllFriends(userId);

        // We query the hemisphere
        const hemisphere = userId.charAt(0);

        // We delete the user
        await userRepository.deleteUserFromId(userId, hemisphere);

        // Return the response
        return { status: 'success', message: 'User deleted correctly' };

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
        
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
    }
};

/**
 * Function to get all users.
 * 
 * This function retrieves all users from the database.
 * 
 * @async
 * @function
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const getUsers = async (): Promise<any> => {
    try {
        // We query the users
        const { users, totalUsers } = await userRepository.findAllUsers('id, username, email, lat, lng, language');

        // Return the response
        return { status: 'success', data: users, total: totalUsers };

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
        
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
    }
};

export default {
    addUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers
}