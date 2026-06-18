/** Tema dark por defecto de Pasame La Fija (exportable desde Customizer). */
const defaultDarkTheme = {
  version: 1,
  app: 'pasame-la-fija',
  template: 'Las fijas',
  name: 'modo dark',
  settings: {
    mode: 'dark',
    skin: 'default',
    semiDark: false,
    layout: 'horizontal',
    navbarContentWidth: 'compact',
    contentWidth: 'compact',
    footerContentWidth: 'compact',
    primaryColor: '#0D9394',
    themePreset: 'default',
    componentDensity: 'compact',
    fontFamily: 'roboto',
    bodyShellWidth: 'boxed',
    rightPanelEnabled: true,
    themeBodyBg: '#070f13',
    themeBodyBgImageEnabled: false,
    themeBodyBgGradient: null,
    themePaperBg: '#132026',
    themePaperBgGradient: null,
    themeSidebarBg: 'transparent',
    themeSidebarBgImageEnabled: false,
    themeSidebarBgGradient: null,
    themeCardBorder: 'default',
    headerBgColor: '#122128',
    headerBgImageEnabled: false,
    headerBgGradient: null
  },
  images: {
    body: null,
    header: null,
    sidebar: null
  }
}

export const defaultDarkThemeSettings = defaultDarkTheme.settings

export default defaultDarkTheme
