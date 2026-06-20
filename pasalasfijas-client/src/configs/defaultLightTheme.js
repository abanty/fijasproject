/** Tema light por defecto de Pasame La Fija (exportable desde Customizer). */
const defaultLightTheme = {
  version: 1,
  app: 'pasame-la-fija',
  template: 'Las fijas',
  name: 'TEMA LIGHT',
  settings: {
    mode: 'light', // light | dark | system
    skin: 'default', // default | bordered (bordes visibles en cards)
    semiDark: false, // sidebar oscuro con contenido claro
    layout: 'horizontal', // horizontal | vertical | collapsed
    navbarContentWidth: 'compact', // ancho barra nav: compact | wide
    contentWidth: 'compact', // ancho zona principal
    footerContentWidth: 'compact', // ancho footer
    primaryColor: '#0D9394', // botones, tabs activas, menú seleccionado
    themePreset: 'default', // preset de paleta (default, world-cup, …)
    componentDensity: 'default', // compact = inputs/chips más pequeños
    fontFamily: 'roboto',
    bodyShellWidth: 'boxed', // boxed = contenido centrado con max-width | full
    rightPanelEnabled: true, // panel derecho (nav lateral extra)
    themeBodyBg: 'default', // fondo app; default = paleta Materio
    themeBodyBgImageEnabled: false, // imagen custom encima del fondo
    themeBodyBgGradient: null, // null = sin gradiente
    themePaperBg: '#ffffff', // cards, modales y paneles (MuiPaper / MuiCard)
    themePaperBgGradient: null,
    themeSidebarBg: 'transparent', // transparent = deja ver el fondo body
    themeSidebarBgImageEnabled: false,
    themeSidebarBgGradient: null,
    themeCardBorder: 'default', // borde de cards; default = según skin/preset
    headerBgColor: 'default', // header / barra superior; default = paleta Materio
    headerBgImageEnabled: false,
    headerBgGradient: null
  },
  images: { body: null, header: null, sidebar: null } // null = ninguna; al importar van a localStorage
}

export const defaultLightThemeSettings = defaultLightTheme.settings

export default defaultLightTheme
