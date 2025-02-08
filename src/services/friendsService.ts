import createError from 'http-errors';
import friendsRepository from "../repositories/friendsRepository";
import userRepository from '../repositories/userRepository';
import { ResponseData } from '../types/responseData';

/**
 * Function to add a friend.
 * 
 * This function adds a friend to a user by querying the friends table in the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id of the first user.
 * @param {string} friendId - The user id of the second user.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const addFriend = async (userId: string, friendId: string): Promise<any> => {
    try {
        // We query the friends hemisphere first
        const friendHemisphere = friendId.charAt(0);

        // We query if the friend exists
        const existFriend = await userRepository.findUserFromId(friendId, friendHemisphere, 'id');
        if(!existFriend) throw createError(404, 'Friend does not exist');

        // We query if the users are friends already
        const hasFriends = await friendsRepository.validateFriends(userId, friendId);

        // If the users are already friends, throw a 409 Conflict error
        if(hasFriends) throw createError(409, 'The users are already friends');

        // We add the users as friends
        await friendsRepository.addFriend(userId, friendId);

        // Return the response
        return { status: 'success', message: 'Friend added correctly' };

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
            
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
    }
}

/**
 * Function to delete a friend.
 * 
 * This function deletes a friend from a user by querying the friends table in the database.
 * 
 * @async
 * @function
 * @param {string} userId - The user id of the first user.
 * @param {string} friendId - The user id of the second user.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const deleteFriend = async (userId: string, friendId: string): Promise<any> => {
    try {
        // We query the friends hemisphere first
        const friendHemisphere = friendId.charAt(0);

        // We query if the friend exists
        const existFriend = await userRepository.findUserFromId(friendId, friendHemisphere, 'id');
        if(!existFriend) throw createError(404, 'The friend does not exist');

        // We query if the users are friends already
        const hasFriends = await friendsRepository.validateFriends(userId, friendId);

        // If the users are not friends, throw a 409 Conflict error
        if(!hasFriends) throw createError(409, 'The users are not friends');

        // We delete the users as friends
        await friendsRepository.deleteFriend(userId, friendId);

        // Return the response
        return { status: 'success', message: 'Friend deleted correctly' };

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
        
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
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
 * @param {any} queryValues - The query values. Can contain the following fields:
 * - `limit`: The number of friends to return per page.
 * - `page`: The page number to return.
 * @returns {Promise<any>} Resolves with the result of the query.
 */
const getFriends = async (userId: string, queryValues: any): Promise<any> => {
    try {
        // If we pass the limit and offset, we add them to the query with a formating before
        if(queryValues.limit && queryValues.page) queryValues = { limit: Number(queryValues.limit) || null, page: Number(queryValues.page) + 1 || null };
        
        // We query values
        const { limit, page } = queryValues;
        let newQueryValues;

        // If we have limit and page, we add them to the query values
        if(limit && page) {
            const offset = (page - 1) * limit;
            newQueryValues = { limit: limit, offset: offset };
        }

        // We query the friends
        const{ friendsInfo, totalFriends } = await friendsRepository.getFriends(userId, newQueryValues);

        // Create the response
        let response: ResponseData = { status: 'success', data: friendsInfo, total: totalFriends };
        if(newQueryValues) {
            response = { ...response, totalPages: limit ? Math.ceil((totalFriends ? totalFriends: 0) / limit) : 0, currentPage: page ? page : 0 };
        }

        // Return the response
        return response;

    } catch (error: any) {
        //  If the error is not a 500 Internal Server Error, throw the error
        if(error.status !== 500) throw error;
        
        // If the error is a 500 Internal Server Error, log the error and return a generic error message
        throw createError(500, 'Server error');
    }
}

export default {
    addFriend,
    deleteFriend,
    getFriends
}