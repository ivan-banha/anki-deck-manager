import { beforeEach, describe, expect, it } from 'vitest';

import { Card } from './Card';
import { Deck } from './Deck';
import { Template } from './Template';

describe('Deck', () => {
  let deck: Deck;
  let card: Card;
  let template: Template;

  beforeEach(() => {
    deck = new Deck();
    card = new Card();
    template = new Template();
  });

  it('should throw on getName', () => {
    expect(() => deck.getName()).toThrow('Not implemented');
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
    expect(() => deck.setDescription('test-description')).toThrow('Not implemented');
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
