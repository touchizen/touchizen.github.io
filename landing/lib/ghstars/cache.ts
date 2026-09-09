// A tiny TTL cache over localStorage.
//
// The search API allows 10 requests per minute per visitor IP, so a visitor who
// taps the button a few times can exhaust their own quota in seconds. Repeating
// a query inside the TTL is served from here instead of the network.
//
// Every access is wrapped: in a private window, or with site data blocked, the
// storage accessor itself throws. A cache miss is an acceptable outcome there;
// a blank page is not.

const NAMESPACE = 'ghstars:';

export type CacheStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

type Entry<T> = { at: number; value: T };

export function readCache<T>(
  storage: CacheStorage,
  key: string,
  now: number,
  ttlMs: number
): T | null {
  let raw: string | null;
  try {
    raw = storage.getItem(NAMESPACE + key);
  } catch {
    return null;
  }
  if (raw === null) return null;

  let entry: Entry<T>;
  try {
    entry = JSON.parse(raw) as Entry<T>;
  } catch {
    return null;
  }

  if (typeof entry?.at !== 'number') return null;

  const age = now - entry.at;
  // A negative age means the clock moved backwards; refetch rather than trust it.
  if (age < 0 || age >= ttlMs) return null;

  return entry.value;
}

export function writeCache<T>(storage: CacheStorage, key: string, value: T, now: number): void {
  try {
    storage.setItem(NAMESPACE + key, JSON.stringify({ at: now, value } satisfies Entry<T>));
  } catch {
    // Storage is full or unavailable. The cache is an optimisation, not state.
  }
}
