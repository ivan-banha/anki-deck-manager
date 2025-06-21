import { Database } from 'sql.js';

export abstract class Template {
  #db: Database;

  constructor(db: Database) {
    this.#db = db;
  }
}
