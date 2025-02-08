/**
 * This interface defines the user object.
 *
 * Fields:
 * - id: The user's id type UUID.
 * - username: The user's username.
 * - email: The user's email.
 * - password: The user's password.
 * - lat: The user's latitude.
 * - lng: The user's longitude.
 * - language: The user's language.
 * - hemisphere: The user's hemisphere (north or south).
 *  
*/
export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    lat: number;
    lng: number;
    language: string;
    hemisphere?: string;
}