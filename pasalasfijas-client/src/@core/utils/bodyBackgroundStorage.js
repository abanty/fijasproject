const STORAGE_KEY = 'pasame-la-fija-body-bg-image'

export const getBodyBackgroundImage = () => {
  if (typeof window === 'undefined') return null

  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export const setBodyBackgroundImage = dataUrl => {
  if (typeof window === 'undefined') return

  localStorage.setItem(STORAGE_KEY, dataUrl)
  window.dispatchEvent(new Event('body-bg-image-changed'))
}

export const clearBodyBackgroundImage = () => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event('body-bg-image-changed'))
}

export const BODY_BG_IMAGE_CHANGED = 'body-bg-image-changed'
