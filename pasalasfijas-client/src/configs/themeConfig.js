import { defaultDarkThemeSettings } from './defaultDarkTheme'
import { defaultLightThemeSettings } from './defaultLightTheme'

/*
 * Valores base = defaultLightTheme. Dark usa defaultDarkTheme al cambiar modo.
 * Si no ves cambios en dev, la cookie del Customizer tiene prioridad:
 * reset en Customizer o borra "materio-mui-next-demo" en Application/Storage.
 */
const themeConfig = {
  templateName: 'PasalasFijas',
  homePageUrl: '/dashboard',
  settingsCookieName: 'materio-mui-next-demo',
  defaultLightTheme: defaultLightThemeSettings,
  defaultDarkTheme: defaultDarkThemeSettings,
  ...defaultLightThemeSettings,
  layoutPadding: 24,
  compactContentWidth: 1440,
  navbar: {
    type: 'fixed',
    contentWidth: defaultLightThemeSettings.navbarContentWidth,
    floating: false,
    detached: true,
    blur: true
  },
  footer: {
    type: 'static',
    contentWidth: defaultLightThemeSettings.footerContentWidth,
    detached: true
  },
  disableRipple: false
}

export default themeConfig
