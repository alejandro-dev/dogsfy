import express from 'express';
import existUserMiddleware from '../middlewares/existUserMiddleware';
import friendsController from '../controllers/friendsController';
import authenticateToken from '../middlewares/authenticateJWT';
import validateId from '../middlewares/validateId';

const router = express.Router();

/**
 * - Global middleware for all user paths to verify if the user is authenticated.
 * @middleware authenticateToken - Verify if the user is authenticated.
 */
router.use(authenticateToken);

/**
 * @route POST /api/friends
 * @group Friends
 * @description Add a friend
 * @param {string} friendId.params - Friend id
 * @security bearerAuth
 * @middleware authenticateToken - Verify if the user is authenticated.
 * @middleware friendsController.validateAddFriends - Validate the friend data.
 * @returns {object} 200 - Friend added successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not Found. The friend is not found
 * @returns {Error} 409 - Conflict. The user already is friend
 * @returns {Error} 500 - Error while adding the friend
 */
router.post('/', friendsController.validateAddFriends, friendsController.addFriend);

/**
 * @route DELETE /api/friends/:friendId
 * @group Friends
 * @description Delete a friend
 * @param {string} friendId.path - Friend id
 * @security bearerAuth
 * @middleware authenticateToken - Verify if the user is authenticated.
 * @middleware existUserMiddleware.existById - Verify if the user exists.
 * @middleware friendsController.validateDeleteFriends - Validate the friend data.
 * @returns {object} 200 - Friend deleted successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not Found. The friend is not found
 * @returns {Error} 409 - Conflict. The user is not friend
 * @returns {Error} 500 - Error while deleting the friend    
 */
router.delete('/:friendId', validateId, existUserMiddleware.existById, friendsController.validateDeleteFriends, friendsController.deleteFriend);

/**
 * @route GET /api/friends
 * @group Friends
 * @description Get all friends
 * @param {string} limit.query - (Optional) Number of friends to return per page
 * @param {string} page.query - (Optional) Page number to return
 * @security bearerAuth
 * @middleware authenticateToken - Verify if the user is authenticated.
 * @returns {object} 200 - Friends retrieved successfully
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 500 - Error while retrieving the friends
 */
router.get('/', friendsController.getFriends);

export default router;

