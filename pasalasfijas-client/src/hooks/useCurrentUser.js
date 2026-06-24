'use client'

import { useCallback, useEffect, useState } from 'react'

import { getAccessToken } from '@/lib/authToken'
import { getMe } from '@/services/authService'

export const useCurrentUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!getAccessToken()) {
      setUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const data = await getMe()
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { user, loading, refresh }
}
