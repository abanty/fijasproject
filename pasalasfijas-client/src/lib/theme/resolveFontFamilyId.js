import themeConfig from '@configs/themeConfig'

import { normalizeThemeSettings } from './normalizeThemeSettings'

export const resolveFontFamilyId = (settings = {}, systemPreference = 'light') => {
  const normalized = normalizeThemeSettings(settings, systemPreference)

  return normalized.fontFamily ?? themeConfig.fontFamily ?? 'roboto'
}
