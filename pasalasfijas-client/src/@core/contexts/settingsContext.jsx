'use client'
import { createContext, useMemo, useState } from 'react'

// Config Imports
import themeConfig from '@configs/themeConfig'
import primaryColorConfig from '@configs/primaryColorConfig'
import {
  getDefaultThemeSettingsForMode,
  getModeSurfaceDefaults,
  resolveEffectiveThemeMode
} from '@configs/modeThemeDefaults'
import { normalizeThemeSettings } from '@/lib/theme/normalizeThemeSettings'
import { clearBodyBackgroundImage } from '@core/utils/bodyBackgroundStorage'
import { clearHeaderBackgroundImage } from '@core/utils/headerBackgroundStorage'
import { clearSidebarBackgroundImage } from '@core/utils/sidebarBackgroundStorage'

// Hook Imports
import { useObjectCookie } from '@core/hooks/useObjectCookie'

// Initial Settings Context
export const SettingsContext = createContext(null)

// Settings Provider
export const SettingsProvider = props => {
  // Initial Settings
  const initialSettings = {
    mode: themeConfig.mode,
    skin: themeConfig.skin,
    semiDark: themeConfig.semiDark,
    layout: themeConfig.layout,
    navbarContentWidth: themeConfig.navbar.contentWidth,
    contentWidth: themeConfig.contentWidth,
    footerContentWidth: themeConfig.footer.contentWidth,
    primaryColor: themeConfig.primaryColor ?? primaryColorConfig[0].main,
    themePreset: themeConfig.themePreset,
    componentDensity: themeConfig.componentDensity ?? 'compact',
    fontFamily: themeConfig.fontFamily,
    bodyShellWidth: themeConfig.bodyShellWidth,
    rightPanelEnabled: themeConfig.rightPanelEnabled,
    themeBodyBg: themeConfig.themeBodyBg,
    themeBodyBgImageEnabled: themeConfig.themeBodyBgImageEnabled,
    themeBodyBgGradient: themeConfig.themeBodyBgGradient,
    themePaperBg: themeConfig.themePaperBg,
    themePaperBgGradient: themeConfig.themePaperBgGradient,
    themeSidebarBg: themeConfig.themeSidebarBg,
    themeSidebarBgImageEnabled: themeConfig.themeSidebarBgImageEnabled,
    themeSidebarBgGradient: themeConfig.themeSidebarBgGradient,
    themeCardBorder: themeConfig.themeCardBorder,
    headerBgColor: themeConfig.headerBgColor,
    headerBgImageEnabled: themeConfig.headerBgImageEnabled,
    headerBgGradient: themeConfig.headerBgGradient
  }

  const systemPreference = props.systemMode ?? themeConfig.mode ?? 'dark'

  const updatedInitialSettings = normalizeThemeSettings(
    {
      ...initialSettings,
      mode: props.mode || themeConfig.mode
    },
    systemPreference
  )

  const resolveSettings = source =>
    normalizeThemeSettings(
      JSON.stringify(source) !== '{}' ? { ...updatedInitialSettings, ...source } : updatedInitialSettings,
      systemPreference
    )

  const getSystemPreference = () => {
    if (typeof window === 'undefined') return systemPreference

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const applyModeRootStyles = (settings, previousMode) => {
    if (!settings.mode || settings.mode === previousMode) return settings

    const effectiveMode = resolveEffectiveThemeMode(settings, getSystemPreference())
    const modeDefaults = getDefaultThemeSettingsForMode(effectiveMode)

    return {
      ...settings,
      ...getModeSurfaceDefaults(effectiveMode),
      primaryColor: modeDefaults.primaryColor,
      componentDensity: modeDefaults.componentDensity,
      rightPanelEnabled: modeDefaults.rightPanelEnabled
    }
  }

  // Cookies
  const [settingsCookie, updateSettingsCookie] = useObjectCookie(
    themeConfig.settingsCookieName,
    resolveSettings(props.settingsCookie)
  )

  // State
  const [_settingsState, _updateSettingsState] = useState(resolveSettings(settingsCookie))

  const updateSettings = (settings, options) => {
    const { updateCookie = true } = options || {}

    _updateSettingsState(prev => {
      const newSettings = applyModeRootStyles({ ...prev, ...settings }, prev.mode)
      const normalizedSettings = normalizeThemeSettings(newSettings, getSystemPreference())

      if (updateCookie) updateSettingsCookie(normalizedSettings)

      return normalizedSettings
    })
  }

  /**
   * Updates the settings for page with the provided settings object.
   * Updated settings won't be saved to cookie hence will be reverted once navigating away from the page.
   *
   * @param settings - The partial settings object containing the properties to update.
   * @returns A function to reset the page settings.
   *
   * @example
   * useEffect(() => {
   *     return updatePageSettings({ theme: 'dark' });
   * }, []);
   */
  const updatePageSettings = settings => {
    updateSettings(settings, { updateCookie: false })

    // Returns a function to reset the page settings
    return () => updateSettings(settingsCookie, { updateCookie: false })
  }

  const resetSettings = () => {
    clearHeaderBackgroundImage()
    clearBodyBackgroundImage()
    clearSidebarBackgroundImage()

    const effectiveMode = resolveEffectiveThemeMode(_settingsState, getSystemPreference())
    const modeDefaults = getDefaultThemeSettingsForMode(effectiveMode)

    updateSettings(
      normalizeThemeSettings(
        {
          ...initialSettings,
          ...modeDefaults,
          mode: _settingsState.mode ?? themeConfig.mode
        },
        getSystemPreference()
      )
    )
  }

  const isSettingsChanged = useMemo(
    () => JSON.stringify(initialSettings) !== JSON.stringify(_settingsState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_settingsState]
  )

  return (
    <SettingsContext.Provider
      value={{
        settings: _settingsState,
        updateSettings,
        isSettingsChanged,
        resetSettings,
        updatePageSettings
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}
