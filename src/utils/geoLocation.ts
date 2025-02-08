import createError from 'http-errors'

/**
 * Function to get the hemisphere based on latitude and longitude.
 * 
 * This function checks if the latitude and longitude are within the valid range for the hemisphere (north: -90 to 90, south: -90 to -180).
 * If the latitude and longitude are within the valid range, it returns the hemisphere (north or south).
 * If the latitude and longitude are not within the valid range, it throws an error.
 * 
 * @async
 * @function
 * @param {number} latitude - The latitude.
 * @param {number} longitude - The longitude.
 * @returns {Promise<string>} Resolves with the hemisphere (north or south).
 */
export const geoLocation = async (latitude: number, longitude: number): Promise<string> => {
    if (latitude >= 0 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
        return 'N';

    } else if (latitude < 0 && latitude >= -90 && longitude >= -180 && longitude <= 180){
        return 'S';
        
    } else {
        throw createError(400, 'Latitude and longitude are not valid');
    }
}