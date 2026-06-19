/** Etiquetas de navegación — mismo contexto que referencias del sector, tono propio de Las fijas. */

export const navigationSections = {
  today: 'Hoy',
  value: 'Lectura de valor',
  account: 'Tu espacio'
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
    label: 'Bitácora de aciertos',
    href: '/history',
    icon: 'ri-file-list-3-line'
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
    label: 'Membresías',
    href: '/pricing',
    icon: 'ri-vip-diamond-line'
  },
  support: {
    id: 'support',
    label: 'Centro de ayuda',
    href: '/support',
    icon: 'ri-customer-service-2-line'
  }
}

export const sidebarMenuData = () => [
  {
    section: navigationSections.today,
    items: [
      withActive(navigationItems.home),
      withActive(navigationItems.competitions),
      withActive(navigationItems.predictions),
      withActive(navigationItems.history)
    ]
  },
  {
    section: navigationSections.value,
    items: [
      withActive(navigationItems.topOdds),
      withActive(navigationItems.oddsEv),
      withActive(navigationItems.ev),
      withActive(navigationItems.betCalculator)
    ]
  },
  {
    section: navigationSections.account,
    items: [withActive(navigationItems.pricing), withActive(navigationItems.support)]
  }
]

export const horizontalMenuData = () => [
  navigationItems.home,
  navigationItems.competitions,
  navigationItems.predictions,
  navigationItems.history,
  navigationItems.pricing
]

export const verticalMenuData = () => [
  navigationItems.home,
  navigationItems.competitions,
  navigationItems.predictions,
  navigationItems.history,
  navigationItems.topOdds,
  navigationItems.oddsEv,
  navigationItems.ev,
  navigationItems.betCalculator,
  navigationItems.pricing,
  navigationItems.support
]

export const headerMenuData = horizontalMenuData

export const getNavItemByHref = href =>
  Object.values(navigationItems).find(item => item.href === href) ?? null
