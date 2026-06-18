const sidebarMenuData = () => [
  {
    section: 'Populares',
    items: [
      {
        id: 'predictions-today',
        label: 'Predicciones de hoy',
        href: '/predictions',
        icon: 'ri-sparkling-line',
        active: true
      },
      {
        id: 'matches-today',
        label: 'Partidos del dia',
        href: '/matches',
        icon: 'ri-football-line',
        active: true
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'ri-dashboard-line',
        active: true
      },
      {
        id: 'match-of-day',
        label: 'Partido del dia',
        href: '/matches',
        icon: 'ri-trophy-line'
      },
      {
        id: 'live-odds',
        label: 'Cuotas en vivo',
        href: '/matches',
        icon: 'ri-pulse-line'
      }
    ]
  },
  {
    section: 'Seguimiento',
    items: [
      {
        id: 'history',
        label: 'Historial',
        href: '/history',
        icon: 'ri-history-line',
        active: true
      },
      {
        id: 'bankroll',
        label: 'Banca',
        href: '/bankroll',
        icon: 'ri-wallet-3-line',
        active: true
      },
      {
        id: 'pricing',
        label: 'Planes Premium',
        href: '/pricing',
        icon: 'ri-vip-crown-line',
        active: true
      },
      {
        id: 'saved-picks',
        label: 'Mis picks guardados',
        href: '/history',
        icon: 'ri-bookmark-line'
      },
      {
        id: 'weekly-performance',
        label: 'Rendimiento semanal',
        href: '/dashboard',
        icon: 'ri-bar-chart-grouped-line'
      }
    ]
  },
  {
    section: 'Ligas',
    items: [
      {
        id: 'league-ucl',
        label: 'Champions League',
        href: '/matches',
        icon: 'ri-star-line'
      },
      {
        id: 'league-epl',
        label: 'Premier League',
        href: '/matches',
        icon: 'ri-flag-line'
      },
      {
        id: 'league-laliga',
        label: 'La Liga',
        href: '/matches',
        icon: 'ri-flag-line'
      },
      {
        id: 'league-seriea',
        label: 'Serie A',
        href: '/matches',
        icon: 'ri-flag-line'
      },
      {
        id: 'league-ligamx',
        label: 'Liga MX',
        href: '/matches',
        icon: 'ri-flag-line'
      },
      {
        id: 'league-libertadores',
        label: 'Copa Libertadores',
        href: '/matches',
        icon: 'ri-global-line'
      }
    ]
  },
  {
    section: 'Mercados',
    items: [
      {
        id: 'market-1x2',
        label: '1X2',
        href: '/predictions',
        icon: 'ri-layout-grid-line'
      },
      {
        id: 'market-ou',
        label: 'Over / Under',
        href: '/predictions',
        icon: 'ri-arrow-up-down-line'
      },
      {
        id: 'market-btts',
        label: 'Ambos anotan',
        href: '/predictions',
        icon: 'ri-exchange-line'
      },
      {
        id: 'market-handicap',
        label: 'Handicap asiatico',
        href: '/predictions',
        icon: 'ri-scales-3-line'
      },
      {
        id: 'market-corners',
        label: 'Corners y tarjetas',
        href: '/predictions',
        icon: 'ri-corner-down-right-line'
      }
    ]
  },
  {
    section: 'Herramientas',
    items: [
      {
        id: 'tool-odds-calc',
        label: 'Calculadora de cuota',
        href: '/bankroll',
        icon: 'ri-calculator-line'
      },
      {
        id: 'tool-stake',
        label: 'Gestor de stake',
        href: '/bankroll',
        icon: 'ri-percent-line'
      },
      {
        id: 'tool-alerts',
        label: 'Alertas de valor',
        href: '/predictions',
        icon: 'ri-notification-3-line'
      },
      {
        id: 'tool-books',
        label: 'Comparador de casas',
        href: '/pricing',
        icon: 'ri-store-2-line'
      }
    ]
  },
  {
    section: 'Cuenta',
    items: [
      {
        id: 'account-profile',
        label: 'Mi perfil',
        href: '/dashboard',
        icon: 'ri-user-line'
      },
      {
        id: 'account-subscription',
        label: 'Suscripcion',
        href: '/pricing',
        icon: 'ri-shield-star-line'
      },
      {
        id: 'about',
        label: 'Acerca de',
        href: '/about',
        icon: 'ri-information-line',
        active: true
      }
    ]
  }
]

export default sidebarMenuData
