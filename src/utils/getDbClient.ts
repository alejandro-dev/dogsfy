import createError from 'http-errors';
import { Database } from 'sqlite';
import { usersNDb, usersSDb, friendsDb } from '../config/db';

/**
 * Function to get a database client.
 * 
 * This function retrieves a database client based on the dbKey.
 * 
 * @async
 * @function
 * @param {string} dbKey - The database key (n for north, s for south, f for friends).
 * @returns {Promise<Database>} Resolves with the database client.
 */
const getDbClient = async (dbKey: string): Promise<Database> => {
    // Get the database instance based on the dbKey
    const SQLiteDbInstance = dbKey === 'n' ? usersNDb : dbKey === 's' ? usersSDb : friendsDb;

    // Get the database client
    const dbClient = await SQLiteDbInstance.getClient();

    // If the database client is not available, throw an error
    if (!dbClient) throw createError(500, 'Could not get database connection');

    // Return the database client
    return dbClient;
};

export default getDbClient;
