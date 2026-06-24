import { getAccessToken } from '@/lib/authToken'
import { toUserFacingMessage } from '@/lib/apiMessages'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const parseErrorMessage = async response => {
  try {
    const body = await response.json()
    const msg = body?.message
    const raw = Array.isArray(msg) ? msg.join(', ') : msg

    return toUserFacingMessage(raw, response.status)
  } catch {
    return toUserFacingMessage('', response.status)
  }
}

export const apiClient = async (path, options = {}) => {
  if (!API_BASE_URL) {
    throw new ApiError('NEXT_PUBLIC_API_BASE_URL is not configured', 500)
  }

  const token = options.skipAuth ? null : getAccessToken()

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    cache: options.cache || 'no-store'
  })

  if (!response.ok) {
    throw new ApiError(await parseErrorMessage(response), response.status)
  }

  return response.json()
}
