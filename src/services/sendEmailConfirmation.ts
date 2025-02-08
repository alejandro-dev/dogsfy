import { log } from "../utils/logger";

/**
 * Function to simulte sendin an email confirmation with a delay.
 * 
 * This function sends an email confirmation to the user.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the email confirmation is sent.
 */
export const sendEmailConfirmation = async (): Promise<void> => {
    // Simulate sending an email confirmation with a delay
    log('Sending email confirmation...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
};