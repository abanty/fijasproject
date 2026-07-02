import { competitionsCatalog } from '@/data/competitions/catalog'
import { getCompetitionMatches as fetchCompetitionMatches, getTodayMatches } from '@/services/matchesService'

export const getCompetitions = () => competitionsCatalog

export const getCompetitionMatchCounts = async () => {
  const worldCup = competitionsCatalog.find(competition => competition.slug === 'world-cup-2026')
  const others = competitionsCatalog.filter(competition => competition.slug !== 'world-cup-2026')

  const [worldCupData, todayData] = await Promise.all([
    worldCup ? fetchCompetitionMatches(worldCup.slug) : Promise.resolve({ items: [] }),
    others.length ? getTodayMatches() : Promise.resolve({ items: [] })
  ])

  const counts = {}

  if (worldCup) {
    counts[worldCup.slug] = worldCupData.items.length
  }

  others.forEach(competition => {
    counts[competition.slug] = todayData.items.filter(item => item.competitionSlug === competition.slug).length
  })

  return counts
}

export const getCompetitionMatches = slug => fetchCompetitionMatches(slug)

export const loadCompetitionsPageData = async () => {
  try {
    const matchCounts = await getCompetitionMatchCounts()

    return {
      competitions: getCompetitions(),
      matchCounts
    }
  } catch {
    return {
      competitions: getCompetitions(),
      matchCounts: {}
    }
  }
}
