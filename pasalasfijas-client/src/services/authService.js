import { apiClient } from '@/lib/apiClient'
import { clearAccessToken, setAccessToken } from '@/lib/authToken'

export const login = async ({ email, password }) => {
  const data = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true
  })
  setAccessToken(data.accessToken)
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
}
