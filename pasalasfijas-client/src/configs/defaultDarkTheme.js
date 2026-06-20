/** Tema dark por defecto de Pasame La Fija (exportable desde Customizer). */
const defaultDarkTheme = {
  version: 1,
  app: 'pasame-la-fija',
  template: 'Las fijas',
  name: 'tftgdgd',
  settings: {
    mode: 'dark', // light | dark | system
    skin: 'default', // default | bordered (bordes visibles en cards)
    semiDark: false, // sidebar oscuro con contenido claro
    layout: 'horizontal', // horizontal | vertical | collapsed
    navbarContentWidth: 'compact', // ancho barra nav: compact | wide
    contentWidth: 'compact', // ancho zona principal
    footerContentWidth: 'compact', // ancho footer
    primaryColor: '#04c96c', // botones, tabs activas, menú seleccionado
    themePreset: 'default', // preset de paleta (default, world-cup, …)
    componentDensity: 'default', // compact = inputs/chips más pequeños
    fontFamily: 'roboto',
    bodyShellWidth: 'boxed', // boxed = contenido centrado con max-width | full
    rightPanelEnabled: true, // panel derecho (nav lateral extra)
    themeBodyBg: '#0a0d19', // fondo app; color base del linear-gradient(from, to, angle)
    themeBodyBgImageEnabled: false, // imagen custom encima del fondo
    themeBodyBgGradient: { to: '#090a0d', angle: 180 }, // to = color final; angle = grados CSS
    themePaperBg: '#060709', // cards, modales y paneles (MuiPaper / MuiCard)
    themePaperBgGradient: { to: '#10131e', angle: 90 },
    themeSidebarBg: 'transparent', // transparent = deja ver el fondo body
    themeSidebarBgImageEnabled: false,
    themeSidebarBgGradient: null, // null = sin gradiente
    themeCardBorder: 'default', // borde de cards; default = según skin/preset
    headerBgColor: '#07080d', // header / barra superior con tabs
    headerBgImageEnabled: false,
    headerBgGradient: { to: '#07090e', angle: 180 }
  },
  images: { body: null, header: null, sidebar: null } // null = ninguna; al importar van a localStorage
}

export const defaultDarkThemeSettings = defaultDarkTheme.settings
export const defaultDarkThemeImages = defaultDarkTheme.images

export default defaultDarkTheme
