import { usersNDb, usersSDb, friendsDb } from '../config/db'
import fs from 'fs'
import path from 'path'

/**
 * Function to create the schema.
 * 
 * This function executes all sql statements in createUsersTable.sql and createFriendsTable.sql.
 * 
 * @async
 * @function
 * @param {any} db - The database object.
 * @returns {Promise<void>} Resolves when the schema is created.
 */
const createSchema = async (db: any): Promise<void> => {
   // We get the database client
   const dbClient = await db.getClient()
   if(!dbClient) return;

   // Array of tables to load
   let tables: string[] = [];

   // We load the tables based on the nameKey
   if(db.nameKey === 'n' || db.nameKey === 's') tables = ['createUsersTable.sql'];
   if(db.nameKey === 'f') tables = ['createFriendsTable.sql'];

   // We load the tables
   for (const table of tables) {
      const schema = fs.readFileSync(path.join(__dirname, table));
      console.log(`- LOADING ${table} -`);
      await dbClient.exec(schema.toString());
   }
   
   // We close the database client
   dbClient.close();
};

// We execute the function
Promise.all([
   createSchema(usersNDb),
   createSchema(usersSDb),
   createSchema(friendsDb)

]).then(() => {
   console.log('Finished  OK');

}).catch(error => {
   console.log('Finished  KO', error);

})