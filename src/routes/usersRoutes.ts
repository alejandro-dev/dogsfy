import express from 'express';
import userController from  '../controllers/userController';
import validateId from '../middlewares/validateId';
import existUserMiddleware from '../middlewares/existUserMiddleware';
import authenticateToken from '../middlewares/authenticateJWT';

const router = express.Router();

/**
 * - Global middleware for all user paths to verify if the user is authenticated.
 * @middleware authenticateToken - Verify if the user is authenticated.
 */
router.use(authenticateToken);

/**
 * @route POST /api/users
 * @group Users
 * @description Add a user
 * @param {string} username.body - Username
 * @param {string} email.body - Email
 * @param {string} password.body - Password
 * @param {string} confirm_password.body - Confirm password
 * @param {number} lat.body - Latitude
 * @param {number} lng.body - Longitude
 * @param {string} language.body - Language
 * @security bearerAuth
 * @middleware authenticateToken - Verify if the user is authenticated.
 * @middleware existUserMiddleware.existByUsername - Verify if the username is already registered.
 * @middleware existUserMiddleware.existByEmail - Verify if the email is already registered.
 * @middleware userController.validateAddUser - Validate the registration data.
 * @returns {object} 200 - User created successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 409 - Conflict. The username o email is already registered
 * @returns {Error} 500 - Error while registering the user
 */
router.post('/', existUserMiddleware.existByUsername, existUserMiddleware.existByEmail, userController.validateAddUser, userController.addUser);

/**
 * @route GET /api/users/:id
 * @group Users
 * @description Get a user
 * @param {string} id.path - User id
 * @security bearerAuth
 * @middleware authenticateToken - Verify if the user is authenticated.
 * @middleware validateId - Validate the user id.
 * @middleware existUserMiddleware.existById - Verify if the user exists.
 * @returns {object} 200 - User retrieved successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not Found. The user is not found
 * @returns {Error} 500 - Error while retrieving the user
 */
router.get('/:id', validateId, existUserMiddleware.existById, userController.getUser);

/**
 * @route PUT /api/users/:id
 * @group Users
 * @description Update a user
 * @param {string} id.path - User id
 * @param {string} username.body - Username (optional)
 * @param {string} password.body - Password (optional but required if confirm_password is provided)
 * @param {string} confirm_password.body - Confirm password (optional but required if password is provided)
 * @param {number} lat.body - Latitude (optional)
 * @param {number} lng.body - Longitude (optional)
 * @param {string} language.body - Language (optional)
 * @security bearerAuth
 * @middleware authenticateToken - Verify if the user is authenticated.
 * @middleware validateId - Validate the user id.
 * @middleware existUserMiddleware.existById - Verify if the user exists.
 * @middleware existUserMiddleware.existByUsername - Verify if the username is already registered.
 * @middleware userController.validateUpdateUser - Validate the update data.
 * @returns {object} 200 - User updated successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not Found. The user is not found
 * @returns {Error} 409 - Conflict. The username o email is already registered
 * @returns {Error} 500 - Error while updating the user 
 */
router.put('/:id', validateId, existUserMiddleware.existById, existUserMiddleware.existByUsername, userController.validateUpdateUser, userController.updateUser);

/**
 * @route DELETE /api/users/:id
 * @group Users
 * @description Delete a user
 * @param {string} id.path - User id
 * @security bearerAuth
 * @middleware authenticateToken - Verify if the user is authenticated.
 * @middleware validateId - Validate the user id.
 * @middleware existUserMiddleware.existById - Verify if the user exists.
 * @security bearerAuth
 * @returns {object} 200 - User deleted successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not Found. The user is not found
 * @returns {Error} 500 - Error while deleting the user
 */
router.delete('/:id', validateId, existUserMiddleware.existById, userController.deleteUser);
 
/**
 * @route GET /api/users
 * @group Users
 * @description Get all users
 * @security bearerAuth
 * @middleware authenticateToken - Verify if the user is authenticated.
 * @returns {object} 200 - Users retrieved successfully
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 500 - Error while retrieving the users
 */
router.get('/', userController.getUsers);

export default router;

