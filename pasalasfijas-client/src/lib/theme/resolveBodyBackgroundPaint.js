import { getDefaultThemeImagesForMode, resolveEffectiveThemeMode } from '@configs/modeThemeDefaults'
import { normalizeThemeSettings } from '@/lib/theme/normalizeThemeSettings'

export const toCssImageUrl = value => `url(${JSON.stringify(value)})`

export const resolveBodyBackgroundPaint = (settings = {}, systemPreference = 'light') => {
  const normalized = normalizeThemeSettings(settings, systemPreference)

  if (!normalized.themeBodyBgImageEnabled) return null

  const effectiveMode = resolveEffectiveThemeMode(normalized, systemPreference)
  const url = getDefaultThemeImagesForMode(effectiveMode).body

  if (!url) return null

  return {
    url,
    cssUrl: toCssImageUrl(url)
  }
}

export const applyBodyBackgroundPaint = (root, url) => {
  if (!root || !url) return

  root.style.setProperty('--theme-body-bg-image', toCssImageUrl(url))
  root.dataset.bodyBgImage = 'on'
}

export const clearBodyBackgroundPaint = root => {
  if (!root) return

  root.style.removeProperty('--theme-body-bg-image')
  root.dataset.bodyBgImage = 'off'
}

export const syncBodyBackgroundPaint = (root, url) => {
  if (!url) {
    clearBodyBackgroundPaint(root)

    return
  }

  const nextCssUrl = toCssImageUrl(url)

  if (root.dataset.bodyBgImage === 'on' && root.style.getPropertyValue('--theme-body-bg-image') === nextCssUrl) {
    return
  }

  applyBodyBackgroundPaint(root, url)
}
