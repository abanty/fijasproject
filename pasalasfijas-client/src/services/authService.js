import { apiClient } from '@/lib/apiClient'
import { clearAccessToken, setAccessToken } from '@/lib/authToken'
import { clearUserSession, persistUserSession } from '@/lib/authUserSession'

export const login = async ({ email, password }) => {
  const data = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true
  })
  setAccessToken(data.accessToken)
  if (data.user) persistUserSession(data.user)
  return data
}

export const register = async ({ email, password, name }) => {
  return apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
    skipAuth: true
  })
}

export const getMe = () => apiClient('/users/me')

export const logout = () => {
  clearAccessToken()
  clearUserSession()
}
