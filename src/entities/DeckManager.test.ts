import { beforeEach, describe, expect, it } from 'vitest';

import { DeckManager } from './DeckManager';

describe('DeckManager', () => {
  let manager: DeckManager;

  beforeEach(() => {
    manager = new DeckManager();
  });

  it('should throw on createDeck', () => {
    expect(() => manager.createDeck('test-path')).toThrow('Not implemented');
  });

  it('should throw on readDeck', () => {
    expect(() => manager.readDeck('test-path')).toThrow('Not implemented');
  });

  it('should throw on updateDeck', () => {
    expect(() => manager.updateDeck('test-path')).toThrow('Not implemented');
  });
});
