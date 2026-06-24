import { competitionsCatalog } from '@/data/competitions/catalog'
import { getCompetitionMatches as fetchCompetitionMatches, getTodayMatches } from '@/services/matchesService'

export const getCompetitions = () => competitionsCatalog

export const getCompetitionMatchCounts = async () => {
  const counts = {}

  await Promise.all(
    competitionsCatalog.map(async competition => {
      if (competition.slug === 'world-cup-2026') {
        const data = await fetchCompetitionMatches(competition.slug)
        counts[competition.slug] = data.items.length
        return
      }

      const data = await getTodayMatches()
      counts[competition.slug] = data.items.filter(item => item.competitionSlug === competition.slug).length
    })
  )

  return counts
}

export const getCompetitionMatches = slug => fetchCompetitionMatches(slug)
