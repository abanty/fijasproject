'use client'

// React Imports
import { useEffect } from 'react'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

const BodyShellWidthSync = () => {
  const { settings } = useSettings()

  useEffect(() => {
    const root = document.documentElement
    const width = settings.bodyShellWidth === 'boxed' ? 'boxed' : 'full'

    root.dataset.bodyShellWidth = width
    root.style.setProperty('--body-shell-max-width', `${themeConfig.compactContentWidth}px`)

    if (settings.rightPanelEnabled === true) {
      root.dataset.rightPanel = 'on'
    } else {
      delete root.dataset.rightPanel
    }
  }, [settings.bodyShellWidth, settings.rightPanelEnabled])

  return null
}

export default BodyShellWidthSync
