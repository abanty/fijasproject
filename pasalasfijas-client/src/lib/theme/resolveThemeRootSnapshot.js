import { buildThemeRootSnapshot } from '@/lib/theme/themeRootSurfaces'

export const resolveThemeRootSnapshot = (settings = {}, systemPreference = 'light') =>
  buildThemeRootSnapshot(settings, systemPreference)
