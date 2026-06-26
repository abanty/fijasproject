const CACHE_KEY = 'plf_user_me'

export const SESSION_COOKIE_NAME = 'plf_user_session'

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

export const toUserSessionSnapshot = user => {
  if (!user?.role) return null

  return {
    role: user.role,
    name: user.name ?? null,
    email: user.email ?? null
  }
}

export const parseUserSessionCookie = value => {
  if (!value) return null

  try {
    const parsed = JSON.parse(decodeURIComponent(value))

    if (!parsed?.role) return null

    return parsed
  } catch {
    return null
  }
}

export const getCachedUser = () => {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null

    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const setUserSessionCookie = snapshot => {
  if (typeof document === 'undefined' || !snapshot?.role) return

  document.cookie = `${SESSION_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(snapshot))}; path=/; max-age=${SESSION_MAX_AGE_SECONDS}; SameSite=Lax`
}

export const clearUserSessionCookie = () => {
  if (typeof document === 'undefined') return

  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`
}

export const persistUserSession = user => {
  if (typeof window === 'undefined' || !user) return

  localStorage.setItem(CACHE_KEY, JSON.stringify(user))
  setUserSessionCookie(toUserSessionSnapshot(user))
}

export const clearUserSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CACHE_KEY)
  }

  clearUserSessionCookie()
}
