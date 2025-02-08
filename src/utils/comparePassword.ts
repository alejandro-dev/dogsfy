import bcrypt from 'bcrypt';

/**
 * Function to compare a password.
 * 
 * This function compares a password with a hash.
 * 
 * @async
 * @function
 * @param {string} password - The password to compare.
 * @param {string} hash - The hash to compare with.
 * @returns {Promise<boolean>} Resolves with a boolean indicating if the password matches the hash.
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password.toString(), hash);
}