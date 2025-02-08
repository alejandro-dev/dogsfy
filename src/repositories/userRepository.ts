
import createError from 'http-errors';
import getDbClient from '../utils/getDbClient'; 
import { User } from '../types/user';
import { errorLog } from '../utils/logger';

/**
 * Function to find a user by username.
 * 
 * This function queries a user by username in the database.
 * 
 * @async
 * @function
 * @param {string} select - The fields to select.
 * @param {string} username - The username to search for.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const findUserFromUsername = async (select: string, username: string): Promise<any> => {
    try {
        // Get the database clients for the north and south hemispheres
        const dbClientN = await getDbClient('n');
        const dbClientS = await getDbClient('s');

        // If the clients are not available, throw a 500 Internal Server Error
        if (!dbClientN || !dbClientS) throw createError(500, 'No se pudo conectar a una o ambas bases de datos');

        // Execute the SQL query to select the desired fields from the users table
        const results = await Promise.all([
            // Query the users table from the north hemisphere
            dbClientN.get(`SELECT ${select} FROM users WHERE username = ?`, [username]),
            
            // Query the users table from the south hemisphere
            dbClientS.get(`SELECT ${select} FROM users WHERE username = ?`, [username])
        ]);

        // If the user is found in one of the databases, return the result
        if (results[0]) return results[0]; 
        if (results[1]) return results[1];

        // If the user is not found, return null
        return null;

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while querying the user');
    }
}

/**
 * Function to find a user by email.
 * 
 * This function queries a user by email in the database.
 * 
 * @async
 * @function
 * @param {string} select - The fields to select.
 * @param {string} email - The email to search for.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const findUserFromEmail = async (select: string, email: string): Promise<any> => {
    try {
        // Get the database clients for the north and south hemispheres
        const dbClientN = await getDbClient('n');
        const dbClientS = await getDbClient('s');

        // If the clients are not available, throw a 500 Internal Server Error
        if (!dbClientN || !dbClientS) throw createError(500, 'No se pudo conectar a una o ambas bases de datos');

        // Execute the SQL query to select the desired fields from the users table
        const results = await Promise.all([
            // Query the users table from the north hemisphere
            dbClientN.get(`SELECT ${select} FROM users WHERE email = ?`, [email]),
            
            // Query the users table from the south hemisphere
            dbClientS.get(`SELECT ${select} FROM users WHERE email = ?`, [email])
        ]);

        // If the user is found in one of the databases, return the result
        if (results[0]) return results[0]; 
        if (results[1]) return results[1];

        // If the user is not found, return null
        return null;

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while querying the user');
    }
}

// Consultar un usuario por su id
/**
 * Function to find a user by id.
 * 
 * This function queries a user by id in the database.
 * 
 * @async
 * @function
 * @param {string} id - The id to search for.
 * @param {string} hemisphere - The hemisphere to search in.
 * @param {string} fields - The fields to select.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const findUserFromId = async (id: string, hemisphere: string, fields?: string): Promise<any> => {
    try {
        // Get the database client for the hemisphere
        const dbClient = await getDbClient(hemisphere);

        // Select the desired fields from the users table
        const select = fields ? fields : '*';

        // Execute the SQL query to select the desired fields from the users table
        return await dbClient.get(`SELECT ${select} FROM users WHERE id = ?`, [id])

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while querying the user');
    }
}

// Consultar todos los usuarios
/**
 * Function to find all users.
 * 
 * This function queries all users in the database.
 * 
 * @async
 * @function
 * @param {string} fields - The fields to select.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const findAllUsers = async (fields?: string): Promise<any> => {
    try {
        // Get the database clients for the north and south hemispheres
        const dbClientN = await getDbClient('n');
        const dbClientS = await getDbClient('s');

        // Select the desired fields from the users table
        const select = fields ? fields : '*';

        // Build the SQL query
        let querySql = `SELECT ${select}
                        FROM users`;

        // Execute the SQL queries
        const results = await Promise.all([
            dbClientN.all(querySql),
            dbClientS.all(querySql)
        ]);

        // Combine the results from both databases
        const users = [...results[0], ...results[1]];

        // If we don't have any users, return an empty array
        if (users.length === 0) return { users, totalUsers: 0 }

        // Total number of users
        const totalUsers = users.length;

        // Return the users and total
        return { users, totalUsers };

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while querying the users');
    }
}

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
const registerUser = async (user: User): Promise<any> => {
    try {
        // Get the database client for the hemisphere
        const dbClient = await getDbClient(user.hemisphere!.toLowerCase());

        // Execute the SQL query to insert the user into the users table and return the result
        return await dbClient.run('INSERT INTO users (id, username, email, password, lat, lng, language) VALUES (?, ?, ?, ?, ?, ?, ?)', [user.id, user.username, user.email, user.password, user.lat, user.lng, user.language]);

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while adding the user');
    }
    
}

// Eliminar un usuario por su id
/**
 * Function to delete a user by id.
 * 
 * This function deletes a user by id in the database.
 * 
 * @async
 * @function
 * @param {string} id - The id of the user to delete.
 * @param {string} hemisphere - The hemisphere of the user to delete.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const deleteUserFromId = async (id: string, hemisphere: string): Promise<any> => {
    try {
        // Get the database client for the hemisphere
        const dbClient = await getDbClient(hemisphere);

        // Execute the SQL query to delete the user from the users table and return the result
        return await dbClient.get('DELETE FROM users WHERE id = ?', [id])

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while deleting the user');
    }
}

/**
 * Function to update a user by id.
 * 
 * This function updates a user by id in the database.
 * 
 * @async
 * @function
 * @param {string} hemisphere - The hemisphere of the user to update.
 * @param {string} query - The SQL query to update the user.
 * @param {any[]} values - The values to update the user.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const updateUser = async (hemisphere: string, query: string, values: any[]): Promise<any> => {
    try {
        // Get the database client for the hemisphere
        const dbClient = await getDbClient(hemisphere);

        // Execute the SQL query to update the user and return the result
        return await dbClient.run(query, values);

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while updating the user');
    }
}

export default {
    findUserFromUsername,
    findUserFromEmail,
    findUserFromId,
    findAllUsers,
    registerUser,
    deleteUserFromId,
    updateUser
}