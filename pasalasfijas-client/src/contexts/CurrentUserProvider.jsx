'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { getAccessToken } from '@/lib/authToken'
import { clearUserSession, getCachedUser, persistUserSession } from '@/lib/authUserSession'
import { getMe } from '@/services/authService'

const CurrentUserContext = createContext({
  user: null,
  loading: true,
  refresh: async () => {}
})

export const CurrentUserProvider = ({ children, initialUser = null }) => {
  const [state, setState] = useState(() => ({
    user: initialUser,
    loading: Boolean(getAccessToken()) && !initialUser
  }))

  const refresh = useCallback(async () => {
    if (!getAccessToken()) {
      clearUserSession()
      setState({ user: null, loading: false })
      return
    }

    setState(current => {
      if (current.user || getCachedUser()) return current

      return { ...current, loading: true }
    })

    try {
      const data = await getMe()
      persistUserSession(data)
      setState({ user: data, loading: false })
    } catch {
      clearUserSession()
      setState({ user: null, loading: false })
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const value = useMemo(
    () => ({
      user: state.user,
      loading: state.loading,
      refresh
    }),
    [state.user, state.loading, refresh]
  )

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}

export const useCurrentUserContext = () => useContext(CurrentUserContext)
