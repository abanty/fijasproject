'use client'

// React Imports
import { useEffect } from 'react'

// Util Imports
import { getHeaderBackgroundImage, HEADER_BG_IMAGE_CHANGED } from '@core/utils/headerBackgroundStorage'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Config Imports
import headerBackgroundConfig from '@configs/headerBackgroundConfig'

// Lib Imports
import { resolveSurfaceLayers } from '@/lib/theme/gradientSurface'

const resolveHeaderSolid = color => {
  if (!color || color === 'default') return null

  const preset = headerBackgroundConfig.find(item => item.color?.toLowerCase() === color.toLowerCase())

  return preset?.color ?? color
}

const applyHeaderAppearance = settings => {
  const root = document.documentElement
  const solidColor = resolveHeaderSolid(settings.headerBgColor)
  const layers = resolveSurfaceLayers(solidColor, settings.headerBgGradient)

  if (layers.paint) {
    root.style.setProperty('--header-bg-solid', layers.solid)
    root.style.setProperty('--header-bg-gradient-layer', layers.gradientLayer ?? 'none')
    root.dataset.headerBg = 'custom'
  } else {
    root.style.removeProperty('--header-bg-solid')
    root.style.removeProperty('--header-bg-gradient-layer')
    root.dataset.headerBg = 'default'
  }

  const image = settings.headerBgImageEnabled ? getHeaderBackgroundImage() : null

  if (image) {
    root.style.setProperty('--header-bg-image', `url("${image}")`)
    root.dataset.headerBgImage = 'on'
  } else {
    root.style.setProperty('--header-bg-image', 'none')
    root.dataset.headerBgImage = 'off'
  }

  const useLightHeaderFg = Boolean(layers.paint) || Boolean(image)

  root.dataset.headerContrast = useLightHeaderFg ? 'light' : 'default'
}

const HeaderAppearanceSync = () => {
  const { settings } = useSettings()

  useEffect(() => {
    applyHeaderAppearance(settings)

    const onImageChange = () => applyHeaderAppearance(settings)

    window.addEventListener(HEADER_BG_IMAGE_CHANGED, onImageChange)

    return () => window.removeEventListener(HEADER_BG_IMAGE_CHANGED, onImageChange)
  }, [settings])

  return null
}

export default HeaderAppearanceSync
