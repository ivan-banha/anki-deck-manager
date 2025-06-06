import { BlobReader, Entry, Uint8ArrayWriter, ZipReader } from '@zip.js/zip.js';
import { readFile } from 'fs/promises';

import { ApkgPackage } from '../types.js';
import { Deck } from './Deck.js';

export class DeckManager {
  public createDeck(path: string): Deck {
    throw new Error('Not implemented');
  }

  public async readDeck(path: string): Promise<Deck> {
    const file = await this.#readDeckFile(path);
    const apkg = await this.#unpackApkg(file);

    return Deck.from(apkg);
  }

  public updateDeck(path: string) {
    throw new Error('Not implemented');
  }

  async #readDeckFile(path: string): Promise<Blob> {
    const data = await readFile(path);

    return new Blob([data]);
  }

  async #unpackApkg(apkgFile: Blob): Promise<ApkgPackage> {
    const reader = new ZipReader(new BlobReader(apkgFile));
    const entries = await reader.getEntries();

    const [db, media] = await Promise.all([
      this.#getAnkiDb(entries),
      this.#readMedia(entries),
    ]);

    return { db, media };
  }

  #getAnkiDb(entries: Entry[]) {
    const dbFileName = 'collection.anki2';
    const dbFile = entries.find((entry) => entry.filename === dbFileName);

    if (!dbFile || dbFile?.getData == null) {
      throw new Error('Could not find collection.anki2 in Anki package');
    }

    return dbFile.getData(new Uint8ArrayWriter());
  }

  async #readMedia(entries: Entry[]): Promise<ApkgPackage['media']> {
    const mediaFileName = 'media';
    const media: ApkgPackage['media'] = {};
    const mediaMap = entries.find((entry) => entry.filename === mediaFileName);

    if (mediaMap?.getData == null) {
      console.warn('Could not find media map in Anki package');
      return media;
    }

    try {
      const mediaMapArrayBuffer = await mediaMap.getData(
        new Uint8ArrayWriter(),
      );
      const mediaMapString = new TextDecoder('utf-8').decode(
        new Uint8Array(mediaMapArrayBuffer),
      );

      const mediaMapJson = JSON.parse(mediaMapString);

      for (const [key, value] of Object.entries(mediaMapJson)) {
        const mediaEntry = entries.find((entry) => entry.filename === key);
        if (mediaEntry?.getData == null) {
          continue;
        }

        const mediaArrayBuffer = await mediaEntry.getData(
          new Uint8ArrayWriter(),
        );
        // default to original key if value is invalid
        media[value?.toString() ?? key] = new Blob([
          new Uint8Array(mediaArrayBuffer),
        ]);
      }

      return media;
    } catch (error) {
      console.error('Error parsing media map:', error);
      return media;
    }
  }
}
