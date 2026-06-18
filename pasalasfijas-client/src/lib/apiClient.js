const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const apiClient = async (path, options = {}) => {
  if (!API_BASE_URL) {
    throw new ApiError('NEXT_PUBLIC_API_BASE_URL is not configured', 500)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    cache: options.cache || 'no-store'
  })

  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.status}`, response.status)
  }

  return response.json()
}
