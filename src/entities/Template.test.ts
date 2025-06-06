import { beforeEach, describe, expect, it } from 'vitest';

import { Template } from './Template';

describe('Template', () => {
  let template: Template;

  beforeEach(() => {
    template = new Template();
  });

  it('should throw on getId', () => {
    expect(() => template.getId()).toThrow('Not implemented');
  });
});
