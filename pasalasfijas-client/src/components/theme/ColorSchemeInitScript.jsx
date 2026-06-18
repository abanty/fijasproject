'use client'

import { useServerInsertedHTML } from 'next/navigation'

import { buildInitColorSchemeScript } from '@/lib/theme/buildInitColorSchemeScript'

const ColorSchemeInitScript = ({ defaultMode }) => {
  useServerInsertedHTML(() => (
    <script
      id='mui-color-scheme-init'
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: buildInitColorSchemeScript(defaultMode) }}
    />
  ))

  return null
}

export default ColorSchemeInitScript
