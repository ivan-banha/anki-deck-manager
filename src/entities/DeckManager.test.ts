import { join } from 'path';

import { beforeEach, describe, expect, it } from 'vitest';

import { dirName } from '../constants.js';
import { DeckManager } from './DeckManager.js';

describe('DeckManager', () => {
  let manager: c;

  beforeEach(() => {
    manager = new DeckManager();
  });

  it('should throw on createDeck', () => {
    expect(() => manager.createDeck('test-path')).toThrow('Not implemented');
  });

  it('should read old version of apkg file', async () => {
    const deckPath = join(dirName, 'entities', 'test-files', 'old-deck.apkg');
    const deck = await manager.readDeck(deckPath);

    expect(deck).not.toBeNull();
  });

  it.skip('should read new version of apkg file', async () => {
    const deckPath = join(dirName, 'entities', 'test-files', 'new-deck.apkg');
    const deck = await manager.readDeck(deckPath);

    expect(deck).not.toBeNull();
  });

  it('should throw on updateDeck', () => {
    expect(() => manager.updateDeck('test-path')).toThrow('Not implemented');
  });
});
