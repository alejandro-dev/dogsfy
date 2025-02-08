import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

/**
* Creates sqlite connection with its client 
*/
// class SQLiteDb {
//    #client: Promise<Database> | null = null;
//    static #databaseFilename: string = './dogsfy.db';

//    constructor() {
//       this.#client = open({
//          filename: SQLiteDb.#databaseFilename,
//          driver: sqlite3.Database
//       });
//    }

//    async getClient(): Promise<Database | null> {
//       if(!this.#client) return null;
//       return this.#client;
//    }
// }

// const SQLiteDbInstance = new SQLiteDb();
// export default SQLiteDbInstance;


class SQLiteDb {
   #client: Promise<Database> | null = null;
   nameKey: string;

   // Bases de datos que vamos a crear
   static #databases = {
      'n': './dogsfy-n.db',
      's': './dogsfy-s.db',
      'f': './dogsfy-friends.db'
   };

   constructor(dbKey: 'n' | 's' | 'f') {
      this.nameKey = dbKey;
      this.#client = open({
         filename: SQLiteDb.#databases[dbKey],
         driver: sqlite3.Database
      });
   }

   async getClient(): Promise<any | null> {
      if(!this.#client) return null;
      return this.#client;
   }
}

// Creamos las db
export const usersNDb = new SQLiteDb("n");
export const usersSDb = new SQLiteDb("s");
export const friendsDb = new SQLiteDb("f");