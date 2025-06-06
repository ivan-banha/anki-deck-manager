import { beforeEach, describe, expect, it } from 'vitest';

import { Card } from './Card';
import { Template } from './Template';

describe('Card', () => {
  let card: Card;

  beforeEach(() => {
    card = new Card();
  });

  it('should throw on getId', () => {
    expect(() => card.getId()).toThrow('Not implemented');
  });

  it('should throw on getFront', () => {
    expect(() => card.getFront()).toThrow('Not implemented');
  });

  it('should throw on getBack', () => {
    expect(() => card.getBack()).toThrow('Not implemented');
  });

  it('should throw on buildFront', () => {
    expect(() => card.buildFront()).toThrow('Not implemented');
  });

  it('should throw on buildBack', () => {
    expect(() => card.buildBack()).toThrow('Not implemented');
  });

  it('should throw on setFrontTemplate', () => {
    expect(() => card.setFrontTemplate(new Template())).toThrow(
      'Not implemented',
    );
  });

  it('should throw on setBackTemplate', () => {
    expect(() => card.setBackTemplate(new Template())).toThrow(
      'Not implemented',
    );
  });
});
