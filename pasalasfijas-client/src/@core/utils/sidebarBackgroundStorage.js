const STORAGE_KEY = 'pasame-la-fija-sidebar-bg-image'

export const getSidebarBackgroundImage = () => {
  if (typeof window === 'undefined') return null

  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export const setSidebarBackgroundImage = dataUrl => {
  if (typeof window === 'undefined') return

  localStorage.setItem(STORAGE_KEY, dataUrl)
  window.dispatchEvent(new Event('sidebar-bg-image-changed'))
}

export const clearSidebarBackgroundImage = () => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event('sidebar-bg-image-changed'))
}

export const SIDEBAR_BG_IMAGE_CHANGED = 'sidebar-bg-image-changed'
