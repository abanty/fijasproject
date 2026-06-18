'use client'

import { useEffect } from 'react'

import { getFontFamilyStack } from '@configs/fontFamilyOptions'

import { useSettings } from '@core/hooks/useSettings'
import { normalizeThemeSettings } from '@/lib/theme/normalizeThemeSettings'

const FontFamilySync = () => {
  const { settings } = useSettings()

  useEffect(() => {
    const normalized = normalizeThemeSettings(settings)
    const root = document.documentElement
    const fontFamilyId = normalized.fontFamily ?? 'roboto'
    const stack = getFontFamilyStack(fontFamilyId)

    root.dataset.fontFamily = fontFamilyId
    root.style.setProperty('--app-font-family', stack)
  }, [settings.fontFamily])

  return null
}

export default FontFamilySync
