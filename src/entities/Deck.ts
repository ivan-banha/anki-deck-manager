import initSqlJs, { Database } from 'sql.js';
import sha1 from "sha1";

import { ApkgPackage } from '../types.js';
import { Card } from './Card.js';
import { Template } from './Template.js';

/*
 * TODO:
 *  - Figure out how to distinguish old deck from new deck. Tables structure?
 *
 * QUESTIONS:
 *  - In new deck, deck_config table has column config. The value is binary (i guess), how to read it?
 *
 * NOTES for new decks:
 *  - A card is linked with a template thorough the "ord" field.
 *  - The "ord" field is located in the "fields" table
 */
export class Deck {
  #db: Database;
  #media: ApkgPackage['media'];
  separator = "\u001F";
  topDeckId: any;
  topModelId: any;

  static async from(apkg: ApkgPackage) {
    const sql = await initSqlJs();
    const db = new sql.Database(new Uint8Array(apkg.db));

    return new Deck(db, apkg.media);
  }

  constructor(db: Database, media: ApkgPackage['media']) {
    this.#db = db;
    this.#media = media;
    const now = Date.now();
    const topDeckId = this._getId("cards", "did", now);
    const topModelId = this._getId("notes", "mid", now);
    this.topDeckId = topDeckId;
    this.topModelId = topModelId;
  }

  public async getName() {
    // The decks field contains json array with decks.
    // How to know which one to use?
    const result = this.#db.exec('SELECT decks FROM col');

    if (result == null || result.length === 0) {
      return null;
    }

    // TODO: Create type for "unknown"
    const deckJsons: Record<string, unknown> = JSON.parse(
      result[0].values[0][0]?.toString() ?? '{}',
    );

    const decks = [];

    for (const [deckId, deckJson] of Object.entries(deckJsons)) {
      decks.push(deckJson);
    }
    // Old deck: table "col" -> field "decks"
    // New deck: table "decks"?
    return (decks[0] as any)['name'];
  }

  public getDescription() {
    const result = this.#db.exec('SELECT decks FROM col');

    if (result == null || result.length === 0) {
      return null;
    }

    const deckJsons: Record<string, { desc: string }> = JSON.parse(
      result[0].values[0][0]?.toString() ?? '{}',
    );

    const decks = [];

    for (const [deckId, deckJson] of Object.entries(deckJsons)) {
      decks.push(deckJson);
    }
    
    return (decks[0] as any)['desc'];
  }

  public setName(name: string) {
    throw new Error('Not implemented');
  }

  public setDescription(description: string) {
    throw new Error('Not implemented');
  }

  public isEmpty() {
    const result = this.#db.exec('SELECT COUNT(*) FROM cards');
    if (result == null || result.length === 0) {
      return true;
    }

    return (result[0].values[0][0] as number) === 0;
  }

  public getCardsCount() {
    throw new Error('Not implemented');
  }

  public getCard(id: string): Card[];
  public getCard(card: Card): Card[];
  public getCard(value: string | Card): Card[] {
    // In both new and old decks cards are located in table "cards".
    // It seems like the structure is the same.
    // Also, the cards' data is located in table "notes"
    throw new Error('Not implemented');
  }

  public updateCard(card: Card) {
    throw new Error('Not implemented');
  }

  public removeCard(id: string);
  public removeCard(card: Card);
  public removeCard(value: string | Card) {
    throw new Error('Not implemented');
  }

  public addCard(card: Card) {
    const now = Date.now();
    const note_guid = this._getNoteGuid(this.topDeckId, card.getFront(), card.getBack());
    const note_id = this._getNoteId(note_guid, now);

    this._update(
      "insert or replace into notes values(:id,:guid,:mid,:mod,:usn,:tags,:flds,:sfld,:csum,:flags,:data)",
      {
        ":id": note_id, // integer primary key,
        ":guid": note_guid, // text not null,
        ":mid": this.topModelId, // integer not null,
        ":mod": this._getId("notes", "mod", now), // integer not null,
        ":usn": -1, // integer not null,
        ":tags": 'todo', // text not null,
        ":flds": card.getFront() + this.separator + card.getBack(), // text not null,
        ":sfld": card.getFront(), // integer not null,
        ":csum": this._checksum(card.getFront() + separator + card.getBack()), //integer not null,
        ":flags": 0, // integer not null,
        ":data": "", // text not null,
      }
    );

    return this._update(
      "insert or replace into cards values(:id,:nid,:did,:ord,:mod,:usn,:type,:queue,:due,:ivl,:factor,:reps,:lapses,:left,:odue,:odid,:flags,:data)",
      {
        ":id": this._getCardId(note_id, now), // integer primary key,
        ":nid": note_id, // integer not null,
        ":did": this.topDeckId, // integer not null,
        ":ord": 0, // integer not null,
        ":mod": this._getId("cards", "mod", now), // integer not null,
        ":usn": -1, // integer not null,
        ":type": 0, // integer not null,
        ":queue": 0, // integer not null,
        ":due": 179, // integer not null,
        ":ivl": 0, // integer not null,
        ":factor": 0, // integer not null,
        ":reps": 0, // integer not null,
        ":lapses": 0, // integer not null,
        ":left": 0, // integer not null,
        ":odue": 0, // integer not null,
        ":odid": 0, // integer not null,
        ":flags": 0, // integer not null,
        ":data": "", // text not null
      }
    );
  }

  public getTemplates(): Template[] {
    // In old deck cards templates and styles are located in table "col" -> field "models"
    // In new deck templates are located in templates table. Styles are located in "notetypes table"
    throw new Error('Not implemented');
  }

  public addTemplate(template: Template) {
    throw new Error('Not implemented');
  }

  public deleteTemplate(id: string): void;
  public deleteTemplate(template: Template): void;
  public deleteTemplate(value: string | Template): void {
    throw new Error('Not implemented');
  }

  _update(query: string, obj?: BindParams) {
    this.#db.prepare(query).getAsObject(obj);
  }

  _getNoteId(guid, ts) {
    const query = `SELECT id from notes WHERE guid = :guid ORDER BY id DESC LIMIT 1`;
    const rowObj = this.#db.prepare(query).getAsObject({ ":guid": guid });

    return rowObj.id || this._getId("notes", "id", ts);
  }

  _getId(table, col, ts) {
    const query = `SELECT ${col} from ${table} WHERE ${col} >= :ts ORDER BY ${col} DESC LIMIT 1`;
    const rowObj = this.#db.prepare(query).getAsObject({ ":ts": ts });

    return rowObj[col] ? +rowObj[col] + 1 : ts;
  }

  _getNoteGuid(topDeckId, front, back) {
    return sha1(`${topDeckId}${front}${back}`);
  }

  _checksum(str: string) {
    return parseInt(sha1(str).substr(0, 8), 16);
  }

  _getCardId(note_id, ts) {
    const query = `SELECT id from cards WHERE nid = :note_id ORDER BY id DESC LIMIT 1`;
    const rowObj = this.#db.prepare(query).getAsObject({ ":note_id": note_id });

    return rowObj.id || this._getId("cards", "id", ts);
  }
}