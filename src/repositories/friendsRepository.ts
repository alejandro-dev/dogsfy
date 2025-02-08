import createError from 'http-errors';
import getDbClient from '../utils/getDbClient'; 

/**
 * Function to validate friends.
 * 
 * This function checks if two users are friends by querying the friends table in the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id of the first user.
 * @param {string} friendId - The user id of the second user.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const validateFriends = async (userId: string, friendId: string): Promise<any> => {
    try {
        // Get the database client
        const dbClientFriends = await getDbClient('f');

        // Execute the SQL statement and return the result
        return await dbClientFriends.get(`SELECT id
                                    FROM friends
                                    WHERE (user_id = ? AND friend_id = ?)
                                    OR (user_id = ? AND friend_id = ?);`, [userId, friendId, friendId, userId]);

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while querying friends');
    }
}

/**
 * Function to add friends.
 * 
 * This function adds two users as friends by inserting them into the friends table in the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id of the first user.
 * @param {string} friendId - The user id of the second user.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const addFriend = async (userId: string, friendId: string): Promise<any> => {
    try {
        // Get the database client
        const dbClientFriends = await getDbClient('f');

        // Execute the SQL statement and return the result
        return await dbClientFriends.run(`INSERT INTO friends (user_id, friend_id) VALUES (?, ?);`, [userId, friendId]);

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while adding friends');
    }
}

/**
 * Function to delete friends.
 * 
 * This function deletes two users as friends by deleting them from the friends table in the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id of the first user.
 * @param {string} friendId - The user id of the second user.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const deleteFriend = async (userId: string, friendId: string): Promise<any> => {
    try {
        // Get the database client
        const dbClientFriends = await getDbClient('f');

        // Execute the SQL statement and return the result
        return await dbClientFriends.run(`DELETE FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?);`, [userId, friendId, friendId, userId]);

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while deleting friends');
    }
}

/**
 * Function to delete all friends of a user.
 * 
 * This function deletes all friends of a user by querying the friends table in the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id of the user.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const deleteAllFriends = async (userId: string): Promise<any> => {
    try {
        // Get the database clients
        const dbClientFriends = await getDbClient('f');

        // Execute the SQL statement and return the result
        return await dbClientFriends.run(`DELETE FROM friends WHERE (user_id = ? AND friend_id = ?);`, [userId, userId]);

    } catch (error) {
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while deleting friends');
    }
}

/**
 * Function to get friends.
 * 
 * This function retrieves all friends of a user by querying the friends table in the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id of the user.
 * @param {any} queryValues - The query values.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const getFriends = async (userId: string, queryValues: any): Promise<any> => {
    try {
        // Get the database clients
        const dbClientFriends = await getDbClient('f');
        const dbClientUsersN = await getDbClient('n');
        const dbClientUsersS = await getDbClient('s');

        // Start building the query. We query both when the user is saved in user_id and friend_id with DISTINCT to avoid duplicates even if it shouldn't pass
        let querySql = `SELECT DISTINCT friend_id 
                            FROM friends 
                            WHERE user_id = ?
                            UNION
                            SELECT DISTINCT user_id as friend_id
                            FROM friends 
                            WHERE friend_id = ?`

        // Values to pass to the query
        const values: any = [userId, userId];

        // Request pagination and we have to follow taking the total of friends
        let newQuery = querySql;

        // If there are parameters for the url
        if(queryValues) {
            const { limit, offset } = queryValues;
            newQuery = `${querySql} LIMIT ? OFFSET ?;`
            values.push(limit, offset);
        }

        // Query our friends ids and total of friends
        const friendsIds = await dbClientFriends.all(newQuery, values);
        const totalFriends = (await dbClientFriends.all(querySql, [userId, userId])).length;

        // If we don't have added friends, return an empty array
        if (friendsIds.length === 0) return { friendsInfo: friendsIds, totalFriends: 0 }

        // Now we search for the data of each friend (username, email, etc.)
        const friendsInfo = await Promise.all(friendsIds.map(async (friend: any) => {
            const hemisphere = friend.friend_id.charAt(0);

            // We get the client of the db based on the user
            const dbClientU = hemisphere === 'n' ? dbClientUsersN : dbClientUsersS;
            
            // Query the friend info
            const friendDetails = await dbClientU.get('SELECT id, username, email, lat, lng FROM users WHERE id = ?', [friend.friend_id]);

            // Return the friend info
            return friendDetails;
        }));

        // Return the friends info and total
        return { friendsInfo, totalFriends };

    } catch (error) {
        console.log(error);
        // If there is an error, throw a 500 Internal Server Error
        throw createError(500, 'Error while querying friends');
    }
}

export default {
    validateFriends,
    addFriend,
    deleteFriend,
    deleteAllFriends,
    getFriends
}