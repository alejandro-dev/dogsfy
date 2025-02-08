import { IUser } from '../models/User';

/**
 * Extends the Express Request object with a user property.
 */
declare global {
    namespace Express {
        interface Request {
            user?: { id: string }; 
        }
    }
}