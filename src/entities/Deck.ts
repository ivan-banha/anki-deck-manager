import initSqlJs, { Database } from 'sql.js';

import { ApkgPackage } from '../types.js';
import { Card } from './Card.js';
import { TemplateV1 } from './template/TemplateV1.js';

export type DeckVersion = 1 | 2;

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

  readonly version: DeckVersion;

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

  // Where is description?
  public getDescription() {
    throw new Error('Not implemented');
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

  public removeCard(id: string): Promise<void>;
  public removeCard(card: Card): Promise<void>;
  public removeCard(value: string | Card): Promise<void> {
    throw new Error('Not implemented');
  }

  public addCard(card: Card) {
    throw new Error('Not implemented');
  }

  public getTemplates(): TemplateV1[] {
    // In old deck cards templates and styles are located in table "col" -> field "models"
    // In new deck templates are located in templates table. Styles are located in "notetypes table"
    throw new Error('Not implemented');
  }

  public addTemplate(template: TemplateV1) {
    throw new Error('Not implemented');
  }

  public deleteTemplate(id: string): void;
  public deleteTemplate(template: TemplateV1): void;
  public deleteTemplate(value: string | TemplateV1): void {
    throw new Error('Not implemented');
  }
}
