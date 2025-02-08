import express from 'express';
import authController from '../controllers/authController';
import existUserMiddleware from '../middlewares/existUserMiddleware';
import userController from '../controllers/userController';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @group Auth
 * @description Register a new user
 * @param {string} username.params - Username
 * @param {string} email.params - Email
 * @param {string} password.params - Password
 * @param {string} confirm_password.params - Confirm password
 * @param {number} lat.params - Latitude
 * @param {number} lng.params - Longitude
 * @param {string} language.params - Language
 * @middleware existUserMiddleware.existByUsername - Verify if the username is already registered.
 * @middleware existUserMiddleware.existByEmail - Verify if the email is already registered.
 * @middleware userController.validateAddUser - Validate the registration data.
 * @returns {object} 200 - User created successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 409 - Conflict. The username o email is already registered
 * @returns {Error} 500 - Error while registering the user
 */
router.post('/register', existUserMiddleware.existByUsername, existUserMiddleware.existByEmail, userController.validateAddUser, userController.addUser);

/**
 * @route POST /api/auth/login
 * @group Auth
 * @description Login a user
 * @param {string} email.params - Email
 * @param {string} password.params - Password
 * @middleware authController.validateLogin - Validate the login data.
 * @returns {object} 200 - User created successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not Found. The user is not found
 * @returns {Error} 500 - Error while registering the user
 */
router.post('/login', authController.validateLogin, authController.login);

export default router;

