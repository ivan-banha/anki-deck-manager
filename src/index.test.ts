import { describe, expect, test } from 'vitest';

import { sum } from '.';

describe('Function sum numbers correctly', () => {
  test('2+2=4', () => {
    const result = sum(2, 2);
    expect(result).toBe(4);
  });
});
