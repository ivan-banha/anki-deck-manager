import { join } from 'path';

import { beforeEach, describe, expect, it } from 'vitest';

import { dirName } from '../constants.js';
import { Card } from './Card.js';
import { Deck } from './Deck.js';
import { DeckManager } from './DeckManager.js';
import { TemplateV1 } from './template/TemplateV1.js';

describe('Deck from old .apkg version', () => {
  let deck: Deck;
  let card: Card;
  let template: TemplateV1;

  beforeEach(async () => {
    const manager = new DeckManager();
    const deckPath = join(dirName, 'entities', 'test-files', 'old-deck.apkg');
    deck = await manager.readDeck(deckPath);

    card = new Card();
    template = new TemplateV1();
  });

  it('should read deck name', async () => {
    const name = await deck.getName();
    expect(name).toBe('Default');
  });

  it('should throw on getDescription', () => {
    expect(() => deck.getDescription()).toThrow('Not implemented');
  });

  it('should throw on isEmpty', () => {
    expect(() => deck.isEmpty()).toThrow('Not implemented');
  });

  it('should throw on getCardsCount', () => {
    expect(() => deck.getCardsCount()).toThrow('Not implemented');
  });

  it('should throw on getCards by id', () => {
    expect(() => deck.getCard('test-id')).toThrow('Not implemented');
  });

  it('should throw on getCardsByCard', () => {
    expect(() => deck.getCard(card)).toThrow('Not implemented');
  });

  it('should throw on replaceCard', () => {
    expect(() => deck.updateCard(card)).toThrow('Not implemented');
  });

  it('should throw on removeCardById', () => {
    expect(() => deck.removeCard('test-id')).toThrow('Not implemented');
  });

  it('should throw on removeCard', () => {
    expect(() => deck.removeCard(card)).toThrow('Not implemented');
  });

  it('should throw on setName', () => {
    expect(() => deck.setName('test-name')).toThrow('Not implemented');
  });

  it('should throw on setDescription', () => {
    expect(() => deck.setDescription('test-description')).toThrow(
      'Not implemented',
    );
  });

  it('should throw on addCard', () => {
    expect(() => deck.addCard(card)).toThrow('Not implemented');
  });

  it('should throw on addTemplate', () => {
    expect(() => deck.addTemplate(template)).toThrow('Not implemented');
  });

  it('should throw on deleteTemplate by id', () => {
    expect(() => deck.deleteTemplate('template-id')).toThrow('Not implemented');
  });

  it('should throw on deleteTemplate by template', () => {
    expect(() => deck.deleteTemplate(template)).toThrow('Not implemented');
  });
});
