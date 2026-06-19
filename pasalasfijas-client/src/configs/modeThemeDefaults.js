import { defaultDarkThemeImages, defaultDarkThemeSettings } from './defaultDarkTheme'
import { defaultLightThemeSettings } from './defaultLightTheme'

const emptyThemeImages = { body: null, header: null, sidebar: null }

export const MODE_SURFACE_KEYS = [
  'themeBodyBg',
  'themeBodyBgImageEnabled',
  'themeBodyBgGradient',
  'themePaperBg',
  'themePaperBgGradient',
  'themeSidebarBg',
  'themeSidebarBgImageEnabled',
  'themeSidebarBgGradient',
  'themeCardBorder',
  'headerBgColor',
  'headerBgImageEnabled',
  'headerBgGradient'
]

export const getDefaultThemeSettingsForMode = (mode = 'light') =>
  mode === 'dark' ? defaultDarkThemeSettings : defaultLightThemeSettings

export const resolveEffectiveThemeMode = (settings, systemPreference = 'light') => {
  const mode = settings?.mode ?? 'light'

  if (mode === 'system') {
    return systemPreference === 'dark' ? 'dark' : 'light'
  }

  return mode === 'dark' ? 'dark' : 'light'
}

export const pickModeSurfaceSettings = settings => {
  const picked = {}

  MODE_SURFACE_KEYS.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      picked[key] = settings[key]
    }
  })

  return picked
}

export const getModeSurfaceDefaults = mode =>
  pickModeSurfaceSettings(getDefaultThemeSettingsForMode(mode))

export const getDefaultThemeImagesForMode = (mode = 'light') =>
  mode === 'dark' ? defaultDarkThemeImages : emptyThemeImages

export const isLegacyLightSurfaceValue = (key, value) => {
  const lightValue = defaultLightThemeSettings[key]

  if (key === 'themeCardBorder' && (value === 'transparent' || value === 'default')) {
    return false
  }

  return value == null || value === 'default' || value === lightValue
}

export const isLegacyDarkSurfaceValue = (key, value) => {
  const darkValue = defaultDarkThemeSettings[key]

  if (key === 'themeCardBorder' && (value === 'transparent' || value === 'default')) {
    return false
  }

  return value == null || value === 'default' || value === darkValue
}
