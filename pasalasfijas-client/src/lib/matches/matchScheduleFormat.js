export const groupMatchesByDate = matches => {
  const groups = new Map()

  matches.forEach(match => {
    const dayKey = match.kickoffAt?.slice(0, 10) ?? 'unknown'

    if (!groups.has(dayKey)) {
      groups.set(dayKey, [])
    }

    groups.get(dayKey).push(match)
  })

  return [...groups.entries()].map(([dayKey, dayMatches]) => ({
    dayKey,
    label: formatMatchDayLabel(dayKey),
    matches: dayMatches
  }))
}

export const formatMatchDayLabel = dayKey => {
  if (!dayKey || dayKey === 'unknown') return 'Sin fecha'

  const date = new Date(`${dayKey}T12:00:00`)

  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export const formatMatchKickoffTime = kickoffAt => {
  if (!kickoffAt) return ''

  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(kickoffAt))
}

export const formatMatchCardDateTime = kickoffAt => {
  if (!kickoffAt) return ''

  const date = new Date(kickoffAt)
  const datePart = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(date)

  return `${datePart} • ${formatMatchKickoffTime(kickoffAt)}`
}

export const formatMatchStatusLabel = status => {
  const labels = {
    FINISHED: 'Finalizado',
    LIVE: 'En juego',
    SCHEDULED: 'Próximo'
  }

  return labels[status] || status
}

export const shortenVenue = venue => {
  if (!venue) return ''

  return venue.split('(')[0].trim()
}
