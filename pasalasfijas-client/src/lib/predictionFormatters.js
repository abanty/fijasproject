export const confidenceLabels = {
  HIGH: 'Alta',
  MEDIUM: 'Media',
  LOW: 'Baja',
  NO_BET: 'No apostar'
}

export const marketLabels = {
  MATCH_WINNER: 'Ganador',
  DOUBLE_CHANCE: 'Doble oportunidad',
  OVER_UNDER_GOALS: 'Over/Under goles',
  BTTS: 'Ambos marcan',
  HANDICAP: 'Handicap',
  CORNERS: 'Corners',
  CARDS: 'Tarjetas'
}

export const resultLabels = {
  PENDING: 'Pendiente',
  WON: 'Ganado',
  LOST: 'Perdido',
  VOID: 'Nulo',
  HALF_WON: 'Medio ganado',
  HALF_LOST: 'Medio perdido'
}

export const formatConfidence = confidence => confidenceLabels[confidence] || confidence || 'Sin dato'

export const formatMarket = market => marketLabels[market] || market || 'Mercado'

export const formatRisk = riskScore => {
  if (riskScore === null || riskScore === undefined) return 'Sin riesgo calculado'

  return `${riskScore}/100`
}

export const getRiskLabel = riskScore => {
  if (riskScore === null || riskScore === undefined) return 'Sin dato'
  if (riskScore <= 35) return 'Riesgo bajo'
  if (riskScore <= 65) return 'Riesgo medio'

  return 'Riesgo alto'
}

export const formatStakeIndex = stakeIndex => {
  if (stakeIndex === null || stakeIndex === undefined) return 'Sin stake'

  return `${stakeIndex}/100`
}

export const formatOdd = odd => {
  if (!odd) return 'Sin cuota'

  return Number(odd).toFixed(2)
}

export const formatKickoff = kickoffAt => {
  if (!kickoffAt) return 'Hora por confirmar'

  return new Intl.DateTimeFormat('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short'
  }).format(new Date(kickoffAt))
}

export const formatMatchDayTime = kickoffAt => {
  if (!kickoffAt) {
    return { day: 'Por confirmar', time: '--:--' }
  }

  const date = new Date(kickoffAt)
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  const time = new Intl.DateTimeFormat('es-PE', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)

  if (isToday) {
    return { day: 'Hoy', time }
  }

  return {
    day: new Intl.DateTimeFormat('es-PE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date),
    time
  }
}
