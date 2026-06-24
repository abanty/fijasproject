/**
 * Navegación PLF — una fuente de verdad:
 * - Header (horizontalMenuData): producto / herramientas de la plataforma
 * - Sidebar (sidebarMenuData): Tu espacio (usuario) + Administración (solo admin)
 */

export const navigationSections = {
  account: 'Tu espacio',
  administration: 'Administración'
}

const withActive = item => ({ ...item, active: true })

export const navigationItems = {
  home: {
    id: 'home',
    label: 'Panel del día',
    href: '/dashboard',
    icon: 'ri-home-4-line'
  },
  competitions: {
    id: 'competitions',
    label: 'Torneos activos',
    href: '/matches',
    icon: 'ri-trophy-line'
  },
  predictions: {
    id: 'predictions',
    label: 'Fijas recomendadas',
    href: '/predictions',
    icon: 'ri-sparkling-line',
    highlight: { badge: 'HOT', color: 'error' }
  },
  history: {
    id: 'history',
    label: 'Mi bitácora',
    href: '/history',
    icon: 'ri-file-list-3-line'
  },
  bankroll: {
    id: 'bankroll',
    label: 'Mi banca',
    href: '/bankroll',
    icon: 'ri-wallet-3-line'
  },
  topOdds: {
    id: 'top-odds',
    label: 'Radar de cuotas',
    href: '/top-odds',
    icon: 'ri-fire-line'
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
    href: '/pricing',
    icon: 'ri-vip-diamond-line'
  },
  support: {
    id: 'support',
    label: 'Centro de ayuda',
    href: '/support',
    icon: 'ri-customer-service-2-line'
  },
  moreTools: {
    id: 'more-tools',
    label: 'Más herramientas',
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

/** Sidebar — módulos de administración (agregar entradas aquí a futuro) */
export const adminNavigationItems = {
  operationsHub: {
    id: 'admin-operations-hub',
    label: 'Datos y operaciones',
    href: '/admin',
    icon: 'ri-settings-3-line'
  }
}

/** Sidebar izquierdo — Tu espacio (todos) + Administración (solo admin) */
export const getSidebarMenuData = ({ isAdmin = false } = {}) => {
  const sections = [
    {
      section: navigationSections.account,
      items: [
        withActive(navigationItems.history),
        withActive(navigationItems.bankroll),
        withActive(navigationItems.pricing),
        withActive(navigationItems.support)
      ]
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

/** Header — producto y herramientas de análisis */
export const horizontalMenuData = () => [
  navigationItems.predictions,
  navigationItems.home,
  navigationItems.competitions,
  navigationItems.topOdds,
  navigationItems.moreTools
]

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
