import themeConfig from '@configs/themeConfig'

import { normalizeThemeSettings } from './normalizeThemeSettings'

export const resolveDensityDataset = (settings = {}, systemPreference = 'light') => {
  const normalized = normalizeThemeSettings(settings, systemPreference)

  return normalized.componentDensity ?? themeConfig.componentDensity ?? 'compact'
}
