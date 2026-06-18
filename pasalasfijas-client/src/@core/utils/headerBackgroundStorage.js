const STORAGE_KEY = 'pasame-la-fija-header-bg-image'

export const getHeaderBackgroundImage = () => {
  if (typeof window === 'undefined') return null

  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export const setHeaderBackgroundImage = dataUrl => {
  if (typeof window === 'undefined') return

  localStorage.setItem(STORAGE_KEY, dataUrl)
  window.dispatchEvent(new Event('header-bg-image-changed'))
}

export const clearHeaderBackgroundImage = () => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event('header-bg-image-changed'))
}

export const HEADER_BG_IMAGE_CHANGED = 'header-bg-image-changed'
