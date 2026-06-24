export const competitionsCatalog = [
  {
    id: 'friendlies',
    slug: 'friendlies',
    title: 'Amistosos Internacionales',
    description:
      'Partidos de preparación de las selecciones nacionales. Datos en tiempo real: directo, stats, incidencias y predicciones IA.',
    icon: 'ri-shake-hands-line',
    matchCountLabel: null,
    featured: false
  },
  {
    id: 'world-cup-2026',
    slug: 'world-cup-2026',
    title: 'FIFA World Cup 2026',
    description:
      'El torneo más grande del mundo. 48 selecciones, 104 partidos y predicciones IA para cada encuentro.',
    icon: 'ri-trophy-line',
    matchCountLabel: '104 partidos',
    featured: true,
    cardBackgroundImage: '/images/illustrations/wallpapers/background-cards-dark.png'
  }
]

export const getCompetitionBySlug = slug =>
  competitionsCatalog.find(competition => competition.slug === slug) ?? null

export const getCompetitionHref = slug => `/matches/${slug}`
