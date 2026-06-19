export const DEFAULT_DARK_WALLPAPER = '/images/illustrations/wallpapers/scren.jpg'

/** Tema dark por defecto de Pasame La Fija (exportable desde Customizer). */
const defaultDarkTheme = {
  version: 1,
  app: 'pasame-la-fija',
  template: 'Las fijas',
  name: 'nuevo tema dark',
  settings: {
    mode: 'dark',
    skin: 'default',
    semiDark: false,
    layout: 'horizontal',
    navbarContentWidth: 'compact',
    contentWidth: 'compact',
    footerContentWidth: 'compact',
    primaryColor: '#2092EC',
    themePreset: 'default',
    componentDensity: 'compact',
    fontFamily: 'roboto',
    bodyShellWidth: 'boxed',
    rightPanelEnabled: true,
    themeBodyBg: '#070f13',
    themeBodyBgImageEnabled: true,
    themeBodyBgGradient: null,
    themePaperBg: '#060709',
    themePaperBgGradient: {
      to: '#10131e',
      angle: 90
    },
    themeSidebarBg: 'transparent',
    themeSidebarBgImageEnabled: false,
    themeSidebarBgGradient: null,
    themeCardBorder: 'default',
    headerBgColor: '#07080d',
    headerBgImageEnabled: false,
    headerBgGradient: {
      to: '#07090e',
      angle: 180
    }
  },
  images: {
    body: DEFAULT_DARK_WALLPAPER,
    header: null,
    sidebar: null
  }
}

export const defaultDarkThemeSettings = defaultDarkTheme.settings
export const defaultDarkThemeImages = defaultDarkTheme.images

export default defaultDarkTheme
