'use client'

// React Imports
import { useEffect } from 'react'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { normalizeThemeSettings } from '@/lib/theme/normalizeThemeSettings'

const ThemePresetSync = () => {
  const { settings } = useSettings()

  useEffect(() => {
    const normalized = normalizeThemeSettings(settings)

    document.documentElement.dataset.themePreset = normalized.themePreset ?? 'default'
    document.documentElement.dataset.density = normalized.componentDensity ?? 'compact'
  }, [settings])

  return null
}

export default ThemePresetSync
