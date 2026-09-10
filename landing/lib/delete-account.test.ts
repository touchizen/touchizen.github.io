import { describe, expect, it } from 'vitest';
import { deleteAccountAppFromSearch, deleteAccountPath } from './delete-account';

describe('delete-account routing', () => {
  it('opens the Datrans deletion information from a stable query URL', () => {
    expect(deleteAccountAppFromSearch('datrans')).toBe('datrans');
    expect(deleteAccountPath('ko', 'datrans')).toBe('/ko/delete-account/?app=datrans');
  });

  it('keeps MathShorts as the safe default for unknown values', () => {
    expect(deleteAccountAppFromSearch(null)).toBe('mathshorts');
    expect(deleteAccountAppFromSearch('unknown')).toBe('mathshorts');
  });
});
