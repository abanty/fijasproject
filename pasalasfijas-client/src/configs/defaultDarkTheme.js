/** Tema dark por defecto de Pasame La Fija (exportable desde Customizer). */
const defaultDarkTheme = {
  version: 1,
  app: 'pasame-la-fija',
  template: 'PasalasFijas',
  name: 'fgdf',
  settings: {
    mode: 'dark',
    skin: 'default',
    semiDark: false,
    layout: 'horizontal',
    navbarContentWidth: 'compact',
    contentWidth: 'compact',
    footerContentWidth: 'compact',
    primaryColor: '#04c96c',
    themePreset: 'default',
    componentDensity: 'default',
    fontFamily: 'roboto',
    bodyShellWidth: 'boxed',
    rightPanelEnabled: true,
    themeBodyBg: '#22242a',
    themeBodyBgImageEnabled: false,
    themeBodyBgGradient: null,
    themePaperBg: '#141518',
    themePaperBgGradient: null,
    themeSidebarBg: 'transparent',
    themeSidebarBgImageEnabled: false,
    themeSidebarBgGradient: null,
    themeCardBorder: 'default',
    headerBgColor: '#141518',
    headerBgImageEnabled: false,
    headerBgGradient: null
  },
  images: { body: null, header: null, sidebar: null }
}

export const defaultDarkThemeSettings = defaultDarkTheme.settings
export const defaultDarkThemeImages = defaultDarkTheme.images

export default defaultDarkTheme
