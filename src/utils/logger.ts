import debug from 'debug';

/**
 * Debug logger for the application.
 * 
 * This logger is used to log messages during the application execution.
 * 
 */
const log = debug('app:log');
const errorLog = debug('app:error');

export { log, errorLog };
