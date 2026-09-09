import { describe, expect, it } from 'vitest';
import { readCache, writeCache, type CacheStorage } from './cache';

function fakeStorage(seed: Record<string, string> = {}): CacheStorage & { data: Record<string, string> } {
  const data = { ...seed };
  return {
    data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v;
    },
  };
}

const throwingStorage: CacheStorage = {
  getItem: () => {
    throw new Error('storage disabled');
  },
  setItem: () => {
    throw new Error('storage disabled');
  },
};

const TTL = 10 * 60 * 1000;

describe('writeCache / readCache', () => {
  it('reads back what it wrote inside the TTL', () => {
    const storage = fakeStorage();
    writeCache(storage, 'k', { hello: 'world' }, 1_000);

    expect(readCache(storage, 'k', 1_000 + TTL - 1, TTL)).toEqual({ hello: 'world' });
  });

  it('returns nothing once the entry is older than the TTL', () => {
    const storage = fakeStorage();
    writeCache(storage, 'k', { hello: 'world' }, 1_000);

    expect(readCache(storage, 'k', 1_000 + TTL, TTL)).toBeNull();
  });

  it('returns nothing for a key that was never written', () => {
    expect(readCache(fakeStorage(), 'missing', 0, TTL)).toBeNull();
  });

  it('keeps separate keys apart', () => {
    const storage = fakeStorage();
    writeCache(storage, 'a', 1, 0);
    writeCache(storage, 'b', 2, 0);

    expect(readCache(storage, 'a', 0, TTL)).toBe(1);
    expect(readCache(storage, 'b', 0, TTL)).toBe(2);
  });

  // Private windows and "block site data" make every localStorage call throw.
  // A cache miss is fine there; a crashed page is not.
  it('survives a storage that throws on read', () => {
    expect(readCache(throwingStorage, 'k', 0, TTL)).toBeNull();
  });

  it('survives a storage that throws on write', () => {
    expect(() => writeCache(throwingStorage, 'k', { a: 1 }, 0)).not.toThrow();
  });

  it('treats a corrupt entry as a miss', () => {
    expect(readCache(fakeStorage({ 'ghstars:k': 'not json' }), 'k', 0, TTL)).toBeNull();
  });

  it('treats an entry with no timestamp as a miss', () => {
    const storage = fakeStorage({ 'ghstars:k': JSON.stringify({ value: 1 }) });

    expect(readCache(storage, 'k', 0, TTL)).toBeNull();
  });

  // A clock that jumped backwards must not resurrect a stale entry forever.
  it('treats an entry stamped in the future as a miss', () => {
    const storage = fakeStorage();
    writeCache(storage, 'k', 'v', 10_000);

    expect(readCache(storage, 'k', 5_000, TTL)).toBeNull();
  });

  it('namespaces its keys so it cannot collide with the rest of the site', () => {
    const storage = fakeStorage();
    writeCache(storage, 'language', 'clobbered', 0);

    expect(storage.data.language).toBeUndefined();
    expect(Object.keys(storage.data)).toEqual(['ghstars:language']);
  });
});
