import themeConfig from '@configs/themeConfig'
import {
  clearBodyBackgroundImage,
  getBodyBackgroundImage,
  setBodyBackgroundImage
} from '@core/utils/bodyBackgroundStorage'
import {
  clearHeaderBackgroundImage,
  getHeaderBackgroundImage,
  setHeaderBackgroundImage
} from '@core/utils/headerBackgroundStorage'
import {
  clearSidebarBackgroundImage,
  getSidebarBackgroundImage,
  setSidebarBackgroundImage
} from '@core/utils/sidebarBackgroundStorage'

export const THEME_EXPORT_VERSION = 1
export const THEME_EXPORT_APP = 'pasame-la-fija'

export const THEME_SETTINGS_KEYS = [
  'mode',
  'skin',
  'semiDark',
  'layout',
  'navbarContentWidth',
  'contentWidth',
  'footerContentWidth',
  'primaryColor',
  'themePreset',
  'componentDensity',
  'fontFamily',
  'bodyShellWidth',
  'rightPanelEnabled',
  'themeBodyBg',
  'themeBodyBgImageEnabled',
  'themeBodyBgGradient',
  'themePaperBg',
  'themePaperBgGradient',
  'themeSidebarBg',
  'themeSidebarBgImageEnabled',
  'themeSidebarBgGradient',
  'themeCardBorder',
  'headerBgColor',
  'headerBgImageEnabled',
  'headerBgGradient'
]

const pickThemeSettings = settings => {
  const picked = {}

  THEME_SETTINGS_KEYS.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      picked[key] = settings[key]
    }
  })

  return picked
}

export const buildThemeExport = (settings, { name } = {}) => ({
  version: THEME_EXPORT_VERSION,
  app: THEME_EXPORT_APP,
  template: themeConfig.templateName,
  exportedAt: new Date().toISOString(),
  name: name?.trim() || null,
  settings: pickThemeSettings(settings),
  images: {
    body: getBodyBackgroundImage(),
    header: getHeaderBackgroundImage(),
    sidebar: getSidebarBackgroundImage()
  }
})

export const parseThemeImportFile = async file => {
  if (!file) throw new Error('No se seleccionó ningún archivo.')

  const text = await file.text()
  let payload

  try {
    payload = JSON.parse(text)
  } catch {
    throw new Error('El archivo no es un JSON válido.')
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('Formato de tema inválido.')
  }

  if (payload.app && payload.app !== THEME_EXPORT_APP) {
    throw new Error('Este archivo pertenece a otra aplicación.')
  }

  if (payload.version && payload.version !== THEME_EXPORT_VERSION) {
    throw new Error('Versión de exportación no compatible.')
  }

  if (!payload.settings || typeof payload.settings !== 'object') {
    throw new Error('Falta la sección "settings" en el archivo.')
  }

  return payload
}

const sanitizeImportedSettings = (settings, images) => {
  const next = pickThemeSettings(settings)

  if (!images?.body) next.themeBodyBgImageEnabled = false
  if (!images?.header) next.headerBgImageEnabled = false
  if (!images?.sidebar) next.themeSidebarBgImageEnabled = false

  return next
}

export const applyThemeImport = payload => {
  if (typeof window === 'undefined') return null

  const images = payload.images ?? {}
  const settings = sanitizeImportedSettings(payload.settings, images)

  if (images.body) setBodyBackgroundImage(images.body)
  else clearBodyBackgroundImage()

  if (images.header) setHeaderBackgroundImage(images.header)
  else clearHeaderBackgroundImage()

  if (images.sidebar) setSidebarBackgroundImage(images.sidebar)
  else clearSidebarBackgroundImage()

  return settings
}

export const downloadThemeExport = (payload, name) => {
  const slug = (name || payload.name || 'tema')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)

  const date = new Date().toISOString().slice(0, 10)
  const filename = `${THEME_EXPORT_APP}-${slug || 'tema'}-${date}.json`
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
