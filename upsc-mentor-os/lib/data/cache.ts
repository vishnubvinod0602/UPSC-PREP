type CacheValue<T> = {
  data: T;
  timestamp: number;
};

const cache = new Map<string, CacheValue<unknown>>();

/**
 * Store data in cache.
 */
export function setCache<T>(
  key: string,
  data: T,
): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Read data from cache.
 */
export function getCache<T>(
  key: string,
): T | null {
  const item = cache.get(key);

  if (!item) {
    return null;
  }

  return item.data as T;
}

/**
 * Check if a cache entry exists.
 */
export function hasCache(
  key: string,
): boolean {
  return cache.has(key);
}

/**
 * Remove a cache entry.
 */
export function deleteCache(
  key: string,
): boolean {
  return cache.delete(key);
}

/**
 * Clear the entire cache.
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Number of cached entries.
 */
export function cacheSize(): number {
  return cache.size;
}

/**
 * Get cache timestamp.
 */
export function getCacheTimestamp(
  key: string,
): number | null {
  const item = cache.get(key);

  return item?.timestamp ?? null;
}

/**
 * Cache with expiry (TTL).
 */
export function getCacheWithTTL<T>(
  key: string,
  ttl: number,
): T | null {
  const item = cache.get(key);

  if (!item) {
    return null;
  }

  if (Date.now() - item.timestamp > ttl) {
    cache.delete(key);
    return null;
  }

  return item.data as T;
}