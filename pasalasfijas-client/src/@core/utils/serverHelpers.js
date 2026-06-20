// Next Imports
import { cache } from 'react'

import { cookies } from 'next/headers'

// React Imports

// Third-party Imports
import 'server-only'

// Config Imports
import themeConfig from '@configs/themeConfig'

/**
 * Una sola lectura de `cookies()` por petición RSC (layout raíz + segmento + Providers).
 */
export const getThemeCookieState = cache(async () => {
  const cookieStore = await cookies()
  const cookieName = themeConfig.settingsCookieName
  const settingsCookie = JSON.parse(cookieStore.get(cookieName)?.value || '{}')
  const mode = settingsCookie.mode || themeConfig.mode
  const colorPrefCookie = cookieStore.get('colorPref')?.value || 'light'
  const systemMode = (mode === 'system' ? colorPrefCookie : mode) || 'light'

  return { settingsCookie, mode, systemMode }
})

export const getSettingsFromCookie = async () => {
  const { settingsCookie } = await getThemeCookieState()

  return settingsCookie
}

export const getMode = async () => {
  const { mode } = await getThemeCookieState()

  return mode
}

export const getSystemMode = async () => {
  const { systemMode } = await getThemeCookieState()

  return systemMode
}

export const getServerMode = async () => {
  const { mode, systemMode } = await getThemeCookieState()

  return mode === 'system' ? systemMode : mode
}

export const getSkin = async () => {
  const settingsCookie = await getSettingsFromCookie()

  return settingsCookie.skin || 'default'
}
