'use client'

import { useSettings } from './useSettings'

export const useCompactDensity = () => {
  const { settings } = useSettings()

  return settings.componentDensity === 'compact'
}
