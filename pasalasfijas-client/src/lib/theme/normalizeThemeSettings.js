import themeConfig from '@configs/themeConfig'
import {
  getDefaultThemeSettingsForMode,
  getModeSurfaceDefaults,
  isLegacyDarkSurfaceValue,
  isLegacyLightSurfaceValue,
  MODE_SURFACE_KEYS,
  resolveEffectiveThemeMode
} from '@configs/modeThemeDefaults'

export const normalizeThemeSettings = (settings = {}, systemPreference = 'light') => {
  const preset = settings.themePreset ?? themeConfig.themePreset ?? 'default'
  const next = { ...settings }

  if (preset !== 'default') return next

  const effectiveMode = resolveEffectiveThemeMode(next, systemPreference)
  const modeDefaults = getDefaultThemeSettingsForMode(effectiveMode)
  const oppositeDefaults = getModeSurfaceDefaults(effectiveMode === 'dark' ? 'light' : 'dark')

  if (!next.themeSidebarBg || next.themeSidebarBg === 'default') {
    next.themeSidebarBg = modeDefaults.themeSidebarBg
  }

  if (!next.componentDensity || next.componentDensity === 'default') {
    next.componentDensity = modeDefaults.componentDensity ?? 'compact'
  }

  if (!next.fontFamily || next.fontFamily === 'inter') {
    next.fontFamily = modeDefaults.fontFamily ?? 'roboto'
  }

  MODE_SURFACE_KEYS.forEach(key => {
    const value = next[key]
    const shouldUseModeDefault =
      effectiveMode === 'dark'
        ? isLegacyLightSurfaceValue(key, value) || value === oppositeDefaults[key]
        : isLegacyDarkSurfaceValue(key, value) || value === oppositeDefaults[key]

    if (shouldUseModeDefault) {
      next[key] = modeDefaults[key]
    }
  })

  return next
}
