import { useMemo, useState } from 'react'

const isKnockoutStage = stageLabel => {
  if (!stageLabel) return false

  return !/^Grupo\s/i.test(stageLabel)
}

const isFinalStage = (stageLabel, matchNumber, totalMatches) => {
  if (stageLabel && /final/i.test(stageLabel)) return true

  return matchNumber === totalMatches
}

export const useWorldCupMatchesFilters = (matches = []) => {
  const [phase, setPhase] = useState('all')
  const [stadium, setStadium] = useState('all')
  const [teamCode, setTeamCode] = useState('all')
  const [quickFilter, setQuickFilter] = useState('all')

  const phases = useMemo(() => {
    const values = [...new Set(matches.map(match => match.stageLabel).filter(Boolean))]

    return values.sort((a, b) => a.localeCompare(b, 'es'))
  }, [matches])

  const stadiums = useMemo(() => {
    const values = [...new Set(matches.map(match => match.venue).filter(Boolean))]

    return values.sort((a, b) => a.localeCompare(b, 'es'))
  }, [matches])

  const teams = useMemo(() => {
    const map = new Map()

    matches.forEach(match => {
      if (match.homeCountryCode) {
        map.set(match.homeCountryCode, match.homeTeam)
      }

      if (match.awayCountryCode) {
        map.set(match.awayCountryCode, match.awayTeam)
      }
    })

    return [...map.entries()]
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name, 'es'))
  }, [matches])

  const filteredMatches = useMemo(() => {
    const todayKey = new Date().toISOString().slice(0, 10)

    return matches.filter(match => {
      if (phase !== 'all' && match.stageLabel !== phase) return false
      if (stadium !== 'all' && match.venue !== stadium) return false

      if (teamCode !== 'all') {
        const inMatch = match.homeCountryCode === teamCode || match.awayCountryCode === teamCode
        if (!inMatch) return false
      }

      if (quickFilter === 'inaugural' && match.matchNumber !== 1) return false

      if (quickFilter === 'now') {
        const matchDay = match.kickoffAt?.slice(0, 10)
        const isToday = matchDay === todayKey
        const isLive = match.status === 'LIVE'
        if (!isToday && !isLive) return false
      }

      if (quickFilter === 'knockout' && !isKnockoutStage(match.stageLabel)) return false

      if (quickFilter === 'final' && !isFinalStage(match.stageLabel, match.matchNumber, matches.length)) {
        return false
      }

      return true
    })
  }, [matches, phase, quickFilter, stadium, teamCode])

  return {
    phase,
    setPhase,
    phases,
    stadium,
    setStadium,
    stadiums,
    teamCode,
    setTeamCode,
    teams,
    quickFilter,
    setQuickFilter,
    filteredMatches
  }
}
