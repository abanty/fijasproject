'use client'

import { useEffect, useRef, useState } from 'react'

import {
  getCacheEntry,
  isCacheFresh,
  revalidate
} from '@/lib/query/queryCache'

export const useCachedQuery = (key, fetcher, options = {}) => {
  const { ttlMs, onError } = options
  const fetcherRef = useRef(fetcher)
  const onErrorRef = useRef(onError)

  fetcherRef.current = fetcher
  onErrorRef.current = onError

  const initialEntry = getCacheEntry(key)
  const [data, setData] = useState(() => initialEntry?.data ?? undefined)
  const [error, setError] = useState(null)
  const [isValidating, setIsValidating] = useState(false)
  const isLoading = data === undefined && error === null
  const isStale = isValidating && data !== undefined

  useEffect(() => {
    let active = true
    const entry = getCacheEntry(key)
    const fresh = entry && isCacheFresh(entry, ttlMs)

    if (fresh) {
      setData(entry.data)
      setError(null)
      setIsValidating(false)
      return
    }

    if (entry) {
      setData(entry.data)
    }

    setIsValidating(true)

    revalidate(key, () => fetcherRef.current(), { ttlMs })
      .then(result => {
        if (!active) return
        setData(result)
        setError(null)
      })
      .catch(err => {
        if (!active) return

        if (onErrorRef.current) {
          setData(onErrorRef.current(err))
          setError(null)
          return
        }

        setError(err)
      })
      .finally(() => {
        if (active) setIsValidating(false)
      })

    return () => {
      active = false
    }
  }, [key, ttlMs])

  return { data, error, isLoading, isValidating, isStale }
}
