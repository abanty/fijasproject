'use client'

import { useEffect } from 'react'

import { useMedia } from 'react-use'

import { getBodyBackgroundImage, BODY_BG_IMAGE_CHANGED } from '@core/utils/bodyBackgroundStorage'
import {
  getHeaderBackgroundImage,
  HEADER_BG_IMAGE_CHANGED
} from '@core/utils/headerBackgroundStorage'
import {
  getSidebarBackgroundImage,
  SIDEBAR_BG_IMAGE_CHANGED
} from '@core/utils/sidebarBackgroundStorage'
import { getDefaultThemeImagesForMode } from '@configs/modeThemeDefaults'
import { applyThemeRootSnapshotToElement, buildThemeRootSnapshot } from '@/lib/theme/themeRootSurfaces'

import { useSettings } from '@core/hooks/useSettings'

let bodyBgImageLoadToken = 0

const syncBodyBackgroundImage = (root, bodyImage) => {
  if (!bodyImage) {
    bodyBgImageLoadToken += 1
    root.style.removeProperty('--theme-body-bg-image')
    root.dataset.bodyBgImage = 'off'
    delete root.dataset.bodyBgImageState

    return
  }

  root.style.setProperty('--theme-body-bg-image', `url("${bodyImage}")`)
  root.dataset.bodyBgImage = 'on'
  root.dataset.bodyBgImageState = 'loading'

  const token = ++bodyBgImageLoadToken
  const img = new Image()

  const markReady = () => {
    if (token !== bodyBgImageLoadToken) return

    root.dataset.bodyBgImageState = 'ready'
  }

  img.onload = markReady
  img.onerror = markReady
  img.src = bodyImage

  if (img.complete) {
    markReady()
  }
}

const applyClientThemeRoot = (settings, systemPreference) => {
  const root = document.documentElement
  const snapshot = buildThemeRootSnapshot(settings, systemPreference)

  applyThemeRootSnapshotToElement(root, snapshot)

  const normalized = snapshot.normalizedSettings
  const sidebarImage = normalized.themeSidebarBgImageEnabled ? getSidebarBackgroundImage() : null

  if (sidebarImage) {
    root.style.setProperty('--theme-sidebar-bg-image', `url("${sidebarImage}")`)
    root.dataset.sidebarBgImage = 'on'
  } else {
    root.style.removeProperty('--theme-sidebar-bg-image')
    root.dataset.sidebarBgImage = 'off'
  }

  const defaultImages = getDefaultThemeImagesForMode(systemPreference)
  const bodyImage = normalized.themeBodyBgImageEnabled
    ? getBodyBackgroundImage() || defaultImages.body || null
    : null

  syncBodyBackgroundImage(root, bodyImage)

  const headerImage = normalized.headerBgImageEnabled ? getHeaderBackgroundImage() : null

  if (headerImage) {
    root.style.setProperty('--header-bg-image', `url("${headerImage}")`)
    root.dataset.headerBgImage = 'on'
    root.dataset.headerContrast = 'light'
  } else {
    root.style.setProperty('--header-bg-image', 'none')
    root.dataset.headerBgImage = 'off'
  }
}

const ThemeSurfaceSync = ({ systemMode = 'light' }) => {
  const { settings } = useSettings()
  const isDark = useMedia('(prefers-color-scheme: dark)', systemMode === 'dark')
  const systemPreference =
    settings.mode === 'system' ? (isDark ? 'dark' : 'light') : settings.mode === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    applyClientThemeRoot(settings, systemPreference)

    const refresh = () => applyClientThemeRoot(settings, systemPreference)

    window.addEventListener(BODY_BG_IMAGE_CHANGED, refresh)
    window.addEventListener(SIDEBAR_BG_IMAGE_CHANGED, refresh)
    window.addEventListener(HEADER_BG_IMAGE_CHANGED, refresh)

    return () => {
      window.removeEventListener(BODY_BG_IMAGE_CHANGED, refresh)
      window.removeEventListener(SIDEBAR_BG_IMAGE_CHANGED, refresh)
      window.removeEventListener(HEADER_BG_IMAGE_CHANGED, refresh)
    }
  }, [
    settings.mode,
    settings.themePreset,
    settings.primaryColor,
    settings.componentDensity,
    settings.fontFamily,
    settings.bodyShellWidth,
    settings.rightPanelEnabled,
    settings.themeBodyBg,
    settings.themeBodyBgGradient,
    settings.themeBodyBgImageEnabled,
    settings.themePaperBg,
    settings.themePaperBgGradient,
    settings.themeSidebarBg,
    settings.themeSidebarBgGradient,
    settings.themeSidebarBgImageEnabled,
    settings.themeCardBorder,
    settings.headerBgColor,
    settings.headerBgGradient,
    settings.headerBgImageEnabled,
    systemPreference
  ])

  return null
}

export default ThemeSurfaceSync
