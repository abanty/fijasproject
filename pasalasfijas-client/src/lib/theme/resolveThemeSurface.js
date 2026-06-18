import { getThemePreset } from '@configs/themePresets'

export const resolveThemeSurface = (settingValue, presetId, surfaceKey) => {
  if (settingValue && settingValue !== 'default') {
    return settingValue
  }

  const preset = getThemePreset(presetId)

  return preset.surfaceDefaults?.[surfaceKey] ?? null
}
