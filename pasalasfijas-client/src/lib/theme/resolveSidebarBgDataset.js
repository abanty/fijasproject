import { isTransparentSurface } from '@configs/themeSurfaceConfig'
import themeConfig from '@configs/themeConfig'

import { normalizeThemeSettings } from './normalizeThemeSettings'
import { resolveThemeSurface } from './resolveThemeSurface'

export const resolveSidebarBgDataset = (settings = {}, systemPreference = 'light') => {
  const normalized = normalizeThemeSettings(settings, systemPreference)
  const preset = normalized.themePreset ?? themeConfig.themePreset ?? 'default'
  const sidebarSolid = resolveThemeSurface(normalized.themeSidebarBg, preset, 'sidebar')

  return isTransparentSurface(sidebarSolid) ? 'transparent' : 'solid'
}
