import { Card } from './Card';
import { Template } from './Template';

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
  constructor() {}

  public getName() {
    // Old deck: table "col" -> field "decks"
    // New deck: table "decks"?
    throw new Error('Not implemented');
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
