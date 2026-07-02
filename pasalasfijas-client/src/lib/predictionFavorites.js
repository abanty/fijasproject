const FAVORITES_STORAGE_KEY = 'prediction-favorites'

export const readFavoriteIds = () => {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)

    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const writeFavoriteIds = ids => {
  if (typeof window === 'undefined') return

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids))
}
