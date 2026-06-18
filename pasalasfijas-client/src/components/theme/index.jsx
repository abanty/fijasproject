'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import { deepmerge } from '@mui/utils'
import { ThemeProvider, lighten, darken, createTheme } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import CssBaseline from '@mui/material/CssBaseline'

// Third-party Imports
import { useMedia } from 'react-use'
import stylisRTLPlugin from 'stylis-plugin-rtl'

// Component Imports
import ModeChanger from './ModeChanger'
import ThemeSurfaceSync from './ThemeSurfaceSync'

// Config Imports
import { getThemePreset } from '@configs/themePresets'
import { resolveThemeSurface } from '@/lib/theme/resolveThemeSurface'
import { getModeStorageKey } from '@/lib/theme/buildInitColorSchemeScript'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Core Theme Imports
import defaultCoreTheme from '@core/theme'

const CustomThemeProvider = props => {
  // Props
  const { children, direction, systemMode } = props

  // Vars
  const isServer = typeof window === 'undefined'
  let currentMode

  // Hooks
  const { settings } = useSettings()
  const isDark = useMedia('(prefers-color-scheme: dark)', systemMode === 'dark')

  if (isServer) {
    currentMode = systemMode
  } else {
    if (settings.mode === 'system') {
      currentMode = isDark ? 'dark' : 'light'
    } else {
      currentMode = settings.mode
    }
  }

  const theme = useMemo(() => {
    const preset = getThemePreset(settings.themePreset)
    const primaryColor = settings.primaryColor
    const effectiveMode = preset.forceMode ?? currentMode

    const primaryPalette = {
      main: primaryColor,
      light: lighten(primaryColor, 0.2),
      dark: darken(primaryColor, 0.1)
    }

    const backgroundOverrides = {}
    const bodyBg = resolveThemeSurface(settings.themeBodyBg, settings.themePreset, 'body')
    const paperBg = resolveThemeSurface(settings.themePaperBg, settings.themePreset, 'paper')

    if (bodyBg) backgroundOverrides.default = bodyBg
    if (paperBg) backgroundOverrides.paper = paperBg

    const paletteExtras = {
      primary: primaryPalette,
      ...(Object.keys(backgroundOverrides).length ? { background: backgroundOverrides } : {})
    }

    const newTheme = {
      colorSchemes: {
        light: {
          palette: deepmerge(preset.palette?.light ?? {}, paletteExtras)
        },
        dark: {
          palette: deepmerge(preset.palette?.dark ?? {}, paletteExtras)
        }
      },
      cssVariables: {
        colorSchemeSelector: 'data'
      }
    }

    const coreTheme = deepmerge(defaultCoreTheme(settings, effectiveMode, direction), newTheme)

    return createTheme(coreTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.primaryColor,
    settings.themePreset,
    settings.themeBodyBg,
    settings.themePaperBg,
    settings.componentDensity,
    settings.fontFamily,
    settings.skin,
    currentMode
  ])

  return (
    <AppRouterCacheProvider
      options={{
        prepend: true,
        ...(direction === 'rtl' && {
          key: 'rtl',
          stylisPlugins: [stylisRTLPlugin]
        })
      }}
    >
      <ThemeProvider
        theme={theme}
        defaultMode={systemMode}
        modeStorageKey={getModeStorageKey()}
      >
        <>
          <ModeChanger systemMode={systemMode} />
          <ThemeSurfaceSync systemMode={systemMode} />
          <CssBaseline />
          {children}
        </>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default CustomThemeProvider
