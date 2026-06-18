import themeConfig from '@configs/themeConfig'
import { getDefaultThemeSettingsForMode, resolveEffectiveThemeMode } from '@configs/modeThemeDefaults'
import { getFontFamilyStack } from '@configs/fontFamilyOptions'
import { getSurfaceContrastTokens } from '@/lib/theme/colorContrast'
import { getContrastColorForGradient, resolveSurfaceLayers } from '@/lib/theme/gradientSurface'
import { normalizeThemeSettings } from '@/lib/theme/normalizeThemeSettings'
import { resolveThemeSurface } from '@/lib/theme/resolveThemeSurface'
import { isTransparentSurface } from '@configs/themeSurfaceConfig'

const FALLBACK_LIGHT_BODY = '#F4F5FA'

const contrastVarSuffixes = {
  fg: 'fg',
  fgMuted: 'fg-muted',
  hoverBg: 'hover-bg',
  border: 'border',
  inputBg: 'input-bg'
}

const setCssVar = (vars, name, value) => {
  if (value != null && value !== '') {
    vars[name] = value
  }
}

const resolveHeaderSolid = color => {
  if (!color || color === 'default') return null

  return color
}

const buildSurfacePaintVars = (vars, prefix, solidColor, gradientSetting) => {
  const layers = resolveSurfaceLayers(solidColor, gradientSetting)
  const contrastColor =
    gradientSetting?.to && solidColor
      ? getContrastColorForGradient(solidColor, gradientSetting.to)
      : solidColor

  setCssVar(vars, `--theme-${prefix}-bg-solid`, layers.solid)
  setCssVar(vars, `--theme-${prefix}-bg-paint`, layers.paint)
  setCssVar(vars, `--theme-${prefix}-bg`, layers.paint)
  setCssVar(vars, `--theme-${prefix}-bg-gradient-layer`, layers.gradientLayer)

  return { ...layers, contrastColor }
}

const buildSurfaceContrastVars = (vars, prefix, bg) => {
  const contrast = getSurfaceContrastTokens(bg)

  if (!contrast) return

  Object.entries(contrastVarSuffixes).forEach(([tokenKey, suffix]) => {
    setCssVar(vars, `--theme-${prefix}-${suffix}`, contrast[tokenKey])
  })
}

export const buildThemeRootSnapshot = (settings = {}, systemPreference = 'light') => {
  const normalized = normalizeThemeSettings(settings, systemPreference)
  const effectiveMode = resolveEffectiveThemeMode(normalized, systemPreference)
  const cssVars = {}
  const dataAttributes = {}

  const bodySolidRaw = resolveThemeSurface(normalized.themeBodyBg, normalized.themePreset, 'body')
  const paperSolid = resolveThemeSurface(normalized.themePaperBg, normalized.themePreset, 'paper')
  const sidebarSolid = resolveThemeSurface(normalized.themeSidebarBg, normalized.themePreset, 'sidebar')
  const cardBorder = resolveThemeSurface(normalized.themeCardBorder, normalized.themePreset, 'cardBorder')
  const modeDefaults = getDefaultThemeSettingsForMode(effectiveMode)
  const fallbackBody =
    modeDefaults.themeBodyBg === 'default' ? FALLBACK_LIGHT_BODY : modeDefaults.themeBodyBg
  const bodySolid = bodySolidRaw ?? fallbackBody

  const bodySurface = buildSurfacePaintVars(
    cssVars,
    'body',
    bodySolid,
    normalized.themeBodyBgGradient
  )
  const paperSurface = buildSurfacePaintVars(
    cssVars,
    'paper',
    paperSolid,
    normalized.themePaperBgGradient
  )
  const sidebarSurface = buildSurfacePaintVars(
    cssVars,
    'sidebar',
    sidebarSolid,
    normalized.themeSidebarBgGradient
  )

  setCssVar(cssVars, '--theme-card-border', cardBorder)

  buildSurfaceContrastVars(cssVars, 'body', bodySurface.contrastColor)
  buildSurfaceContrastVars(cssVars, 'paper', paperSurface.contrastColor)
  buildSurfaceContrastVars(
    cssVars,
    'sidebar',
    isTransparentSurface(sidebarSolid) ? bodySurface.contrastColor : sidebarSurface.contrastColor
  )

  const primaryColor = normalized.primaryColor

  if (primaryColor) {
    setCssVar(
      cssVars,
      '--theme-sidebar-active-gradient',
      `linear-gradient(270deg, ${primaryColor} 0%, color-mix(in srgb, ${primaryColor} 50%, white) 100%)`
    )
    setCssVar(
      cssVars,
      '--theme-sidebar-active-gradient-rtl',
      `linear-gradient(270deg, color-mix(in srgb, ${primaryColor} 50%, white) 0%, ${primaryColor} 100%)`
    )
  }

  const headerSolid = resolveHeaderSolid(normalized.headerBgColor)
  const headerLayers = resolveSurfaceLayers(headerSolid, normalized.headerBgGradient)

  if (headerLayers.paint) {
    setCssVar(cssVars, '--header-bg-solid', headerLayers.solid)
    setCssVar(cssVars, '--header-bg-gradient-layer', headerLayers.gradientLayer ?? 'none')
    dataAttributes['data-header-bg'] = 'custom'
    dataAttributes['data-header-contrast'] = 'light'
  } else {
    dataAttributes['data-header-bg'] = 'default'
    dataAttributes['data-header-contrast'] = 'default'
  }

  dataAttributes['data-header-bg-image'] = 'off'
  dataAttributes['data-body-bg-image'] = 'off'
  dataAttributes['data-sidebar-bg-image'] = 'off'
  dataAttributes['data-sidebar-bg'] = isTransparentSurface(sidebarSolid) ? 'transparent' : 'solid'
  dataAttributes['data-theme-preset'] = normalized.themePreset ?? 'default'
  dataAttributes['data-density'] = normalized.componentDensity ?? themeConfig.componentDensity ?? 'compact'
  dataAttributes['data-font-family'] = normalized.fontFamily ?? themeConfig.fontFamily ?? 'roboto'
  dataAttributes['data-body-shell-width'] =
    normalized.bodyShellWidth === 'boxed' ? 'boxed' : 'full'

  if (normalized.rightPanelEnabled === true) {
    dataAttributes['data-right-panel'] = 'on'
  } else {
    dataAttributes['data-right-panel'] = null
  }

  cssVars['--app-font-family'] = getFontFamilyStack(dataAttributes['data-font-family'])
  cssVars['--body-shell-max-width'] = `${themeConfig.compactContentWidth}px`
  cssVars['--app-sidebar-nav-scroll-padding-inline-end'] = '1.625rem'
  cssVars['--app-sidebar-nav-item-margin-inline-end'] = '0.5rem'
  cssVars['--app-sidebar-ps-rail-inline-end'] = '0.125rem'

  return {
    normalizedSettings: normalized,
    effectiveMode,
    cssVars,
    dataAttributes
  }
}

export const applyThemeRootSnapshotToElement = (element, snapshot) => {
  if (!element || !snapshot) return

  Object.entries(snapshot.cssVars).forEach(([name, value]) => {
    element.style.setProperty(name, value)
  })

  Object.entries(snapshot.dataAttributes).forEach(([key, value]) => {
    const datasetKey = key.replace(/^data-/, '').replace(/-([a-z])/g, (_, char) => char.toUpperCase())

    if (value == null || value === '') {
      delete element.dataset[datasetKey]
    } else {
      element.dataset[datasetKey] = value
    }
  })
}
