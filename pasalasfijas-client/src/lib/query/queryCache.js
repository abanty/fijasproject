const DEFAULT_TTL_MS = 60_000

const cache = new Map()
const inflight = new Map()

export const getCacheEntry = key => cache.get(key) ?? null

export const isCacheFresh = (entry, ttlMs = DEFAULT_TTL_MS) =>
  Boolean(entry && Date.now() - entry.at <= ttlMs)

export const hasCachedData = key => cache.has(key)

export const getCached = (key, ttlMs = DEFAULT_TTL_MS) => {
  const entry = getCacheEntry(key)

  if (!entry || !isCacheFresh(entry, ttlMs)) return null

  return entry
}

export const setCached = (key, data) => {
  cache.set(key, { data, at: Date.now() })
}

export const revalidate = async (key, fetcher, { ttlMs = DEFAULT_TTL_MS } = {}) => {
  if (inflight.has(key)) return inflight.get(key)

  const promise = Promise.resolve()
    .then(fetcher)
    .then(data => {
      setCached(key, data)
      inflight.delete(key)
      return data
    })
    .catch(error => {
      inflight.delete(key)
      throw error
    })

  inflight.set(key, promise)

  return promise
}

export const fetchWithCache = async (key, fetcher, { ttlMs = DEFAULT_TTL_MS, force = false } = {}) => {
  const entry = getCacheEntry(key)

  if (!force && entry && isCacheFresh(entry, ttlMs)) {
    return entry.data
  }

  if (!force && entry) {
    void revalidate(key, fetcher, { ttlMs }).catch(() => {})
    return entry.data
  }

  return revalidate(key, fetcher, { ttlMs })
}

export const prefetchQuery = (key, fetcher, options = {}) => {
  const entry = getCacheEntry(key)

  if (entry && isCacheFresh(entry, options.ttlMs)) return

  void revalidate(key, fetcher, options).catch(() => {})
}
