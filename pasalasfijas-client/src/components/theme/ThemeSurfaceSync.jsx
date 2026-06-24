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
import { syncBodyBackgroundPaint } from '@/lib/theme/resolveBodyBackgroundPaint'
import { applyThemeRootSnapshotToElement, buildThemeRootSnapshot } from '@/lib/theme/themeRootSurfaces'

import { useSettings } from '@core/hooks/useSettings'

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

  syncBodyBackgroundPaint(root, bodyImage)

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
    let frameId = 0

    const apply = () => {
      if (document.querySelector('[data-auth-page="true"]')) return
      applyClientThemeRoot(settings, systemPreference)
    }

    frameId = requestAnimationFrame(apply)

    const refresh = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(apply)
    }

    window.addEventListener(BODY_BG_IMAGE_CHANGED, refresh)
    window.addEventListener(SIDEBAR_BG_IMAGE_CHANGED, refresh)
    window.addEventListener(HEADER_BG_IMAGE_CHANGED, refresh)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener(BODY_BG_IMAGE_CHANGED, refresh)
      window.removeEventListener(SIDEBAR_BG_IMAGE_CHANGED, refresh)
      window.removeEventListener(HEADER_BG_IMAGE_CHANGED, refresh)
    }
  }, [settings, systemPreference])

  return null
}

export default ThemeSurfaceSync
