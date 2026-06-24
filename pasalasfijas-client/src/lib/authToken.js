const KEY = 'plf_access_token'

export const getAccessToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem(KEY)

export const setAccessToken = token => localStorage.setItem(KEY, token)

export const clearAccessToken = () => localStorage.removeItem(KEY)
