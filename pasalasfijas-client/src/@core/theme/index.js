// Config Imports
import themeConfig from '@configs/themeConfig'
import { getThemePreset } from '@configs/themePresets'
import { getFontFamilyStack } from '@configs/fontFamilyOptions'

// Theme Options Imports
import overrides from './overrides'
import colorSchemes from './colorSchemes'
import spacing from './spacing'
import shadows from './shadows'
import customShadows from './customShadows'
import typography from './typography'

const defaultMainColorChannels = {
  light: '46 38 61',
  dark: '231 227 252',
  lightShadow: '46 38 61',
  darkShadow: '19 17 32'
}

const theme = (settings, mode, direction) => {
  const preset = getThemePreset(settings.themePreset)
  const density = settings.componentDensity ?? themeConfig.componentDensity ?? 'compact'

  return {
    direction,
    components: overrides(settings.skin, density),
    colorSchemes: colorSchemes(settings.skin),
    ...spacing,
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10
      }
    },
    shadows: shadows(mode),
    typography: typography(getFontFamilyStack(settings.fontFamily), density),
    customShadows: customShadows(mode),
    mainColorChannels: preset.mainColorChannels ?? defaultMainColorChannels
  }
}

export default theme
