/**

 * Navegación PLF — una fuente de verdad

 *

 * Cómo agregar una entrada nueva (3 pasos):

 * 1. Añádela en `navigationItems` con clave única (ej. `miSeccion: { ... }`).

 * 2. Si debe verse en la 2.ª línea del header → agrega esa clave en `HEADER_TAB_KEYS`.

 * 3. Si debe verse en sidebar / barra inferior → agrégala en las listas de abajo.

 */



export const navigationSections = {

  account: 'Tu espacio',

  administration: 'Administración'

}



const withActive = item => ({ ...item, active: true })



/** Paso 1 — Definición de cada ítem (clave única, sin repetir) */

export const navigationItems = {

  home: {

    id: 'home',

    label: 'Panel del día',

    shortLabel: 'Inicio',

    href: '/dashboard',

    icon: 'ri-home-4-line'

  },

  competitions: {

    id: 'competitions',

    label: 'Torneos activos',

    shortLabel: 'Torneos',

    href: '/matches',

    icon: 'ri-trophy-line'

  },

  predictions: {

    id: 'predictions',

    label: 'Fijas recomendadas',

    shortLabel: 'Fijas',

    href: '/predictions',

    icon: 'ri-sparkling-line',

    highlight: { badge: 'HOT', color: 'error' }

  },

  history: {

    id: 'history',

    label: 'Historial',

    shortLabel: 'Historial',

    href: '/history',

    icon: 'ri-file-list-3-line'

  },

  bankroll: {

    id: 'bankroll',

    label: 'Banca',

    shortLabel: 'Banca',

    href: '/bankroll',

    icon: 'ri-wallet-3-line'

  },

  topOdds: {

    id: 'top-odds',

    label: 'Radar de cuotas',

    shortLabel: 'Radar',

    href: '/top-odds',

    icon: 'ri-fire-line'

  },

  /** Ejemplo — cambia href, icono y textos; luego deja la clave en HEADER_TAB_KEYS */

  trends: {

    id: 'trends',

    label: 'Tendencias',

    shortLabel: 'Trends',

    href: '/trends',

    icon: 'ri-line-chart-line'

  },

  /** Ejemplo — segunda entrada de prueba */

  accums: {

    id: 'accums',

    label: 'Acumuladas',

    shortLabel: 'Accums',

    href: '/accums',

    icon: 'ri-stack-line'

  },

  oddsEv: {

    id: 'odds-ev',

    label: 'Línea vs casa',

    href: '/odds-ev',

    icon: 'ri-bar-chart-box-line'

  },

  ev: {

    id: 'ev',

    label: 'Detector de valor',

    href: '/ev',

    icon: 'ri-money-dollar-circle-line'

  },

  betCalculator: {

    id: 'bet-calculator',

    label: 'Arma tu combinada',

    href: '/bet-calculator',

    icon: 'ri-calculator-line'

  },

  pricing: {

    id: 'pricing',

    label: 'Membresía',

    shortLabel: 'Membresía',

    href: '/pricing',

    icon: 'ri-vip-diamond-line'

  },

  support: {

    id: 'support',

    label: 'Soporte',

    shortLabel: 'Soporte',

    href: '/support',

    icon: 'ri-customer-service-2-line'

  },

  moreTools: {

    id: 'more-tools',

    label: 'Más herramientas',

    shortLabel: 'Ajustes',

    icon: 'ri-tools-line',

    children: [

      {

        id: 'odds-ev',

        label: 'Línea vs casa',

        href: '/odds-ev',

        icon: 'ri-bar-chart-box-line'

      },

      {

        id: 'ev',

        label: 'Detector de valor',

        href: '/ev',

        icon: 'ri-money-dollar-circle-line'

      },

      {

        id: 'bet-calculator',

        label: 'Arma tu combinada',

        href: '/bet-calculator',

        icon: 'ri-calculator-line'

      }

    ]

  }

}



/** Paso 2 — 2.ª línea del header (móvil + desktop). Orden = izquierda → derecha */

const HEADER_TAB_KEYS = [

  'predictions',

  'home',

  'competitions',

  'topOdds',

  'trends',

  'accums',

  'moreTools'

]



/** Sidebar — módulos de administración */

export const adminNavigationItems = {

  operationsHub: {

    id: 'admin-operations-hub',

    label: 'Admin',

    shortLabel: 'Admin',

    href: '/admin',

    icon: 'ri-settings-3-line'

  }

}



/** Paso 3a — Sidebar izquierdo (desktop) */

const SIDEBAR_ACCOUNT_KEYS = ['history', 'bankroll', 'pricing', 'support']



export const getSidebarMenuData = ({ isAdmin = false } = {}) => {

  const sections = [

    {

      section: navigationSections.account,

      items: SIDEBAR_ACCOUNT_KEYS.map(key => withActive(navigationItems[key]))

    }

  ]



  if (isAdmin) {

    sections.push({

      section: navigationSections.administration,

      items: Object.values(adminNavigationItems).map(withActive)

    })

  }



  return sections

}



export const sidebarMenuData = () => getSidebarMenuData()



/** Header — pestañas del producto */

export const horizontalMenuData = () => HEADER_TAB_KEYS.map(key => navigationItems[key])



export const verticalMenuData = () => [

  navigationItems.predictions,

  navigationItems.home,

  navigationItems.competitions,

  navigationItems.topOdds,

  navigationItems.oddsEv,

  navigationItems.ev,

  navigationItems.betCalculator,

  navigationItems.history,

  navigationItems.bankroll,

  navigationItems.pricing,

  navigationItems.support

]



export const headerMenuData = horizontalMenuData



export const getNavItemByHref = href =>

  Object.values(navigationItems).find(item => item.href === href) ?? null



/** Paso 3b — Barra inferior móvil */

const BOTTOM_NAV_PRIMARY_KEYS = ['history', 'bankroll', 'pricing']

const BOTTOM_NAV_MORE_KEYS = ['support']



export const bottomNavMoreAction = {

  id: 'more',

  label: 'Más',

  shortLabel: 'Más',

  icon: 'ri-more-2-line'

}



export const getBottomNavConfig = ({ isAdmin = false } = {}) => {

  const moreItems = [

    ...BOTTOM_NAV_MORE_KEYS.map(key => navigationItems[key]),

    ...(isAdmin ? [adminNavigationItems.operationsHub] : [])

  ]



  return {

    primary: BOTTOM_NAV_PRIMARY_KEYS.map(key => navigationItems[key]),

    moreItems,

    moreAction: bottomNavMoreAction

  }

}



/** @deprecated Usar getBottomNavConfig */

export const getBottomNavItems = ({ isAdmin = false } = {}) => {

  const { primary, moreItems } = getBottomNavConfig({ isAdmin })



  return [...primary, ...moreItems]

}


