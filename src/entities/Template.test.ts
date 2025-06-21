import { beforeEach, describe, expect, it } from 'vitest';

import { TemplateV1 } from './template/TemplateV1.js';

describe('Template', () => {
  let template: TemplateV1;

  beforeEach(() => {
    template = new TemplateV1();
  });

  it('should throw on getId', () => {
    expect(() => template.getId()).toThrow('Not implemented');
  });
});
