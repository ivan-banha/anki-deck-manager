import initSqlJs, { Database } from 'sql.js';

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

  static async from(apkg: ApkgPackage) {
    const sql = await initSqlJs();
    const db = new sql.Database(new Uint8Array(apkg.db));

    return new Deck(db, apkg.media);
  }

  constructor(db: Database, media: ApkgPackage['media']) {
    this.#db = db;
    this.#media = media;
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

    // TODO: Create type for "unknown"
    const deckJsons: Record<string, unknown> = JSON.parse(
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
    // Check if cards table is empty
    throw new Error('Not implemented');
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
    throw new Error('Not implemented');
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
}



// {"1":{"id":1,"mod":0,"name":"Default","usn":0,"lrnToday":[0,0],"revToday":[0,0],"newToday":[0,0],"timeToday":[0,0],"collapsed":true,"browserCollapsed":true,"desc":"","dyn":0,"conf":1,"extendNew":0,"extendRev":0,"reviewLimit":null,"newLimit":null,"reviewLimitToday":null,"newLimitToday":null}}