import { competitionsCatalog } from '@/data/competitions/catalog'
import { getTodayPredictions } from '@/services/predictionsService'

export const getCompetitions = () => competitionsCatalog

export const getCompetitionMatchCounts = async () => {
  const data = await getTodayPredictions()
  const counts = {}

  competitionsCatalog.forEach(competition => {
    counts[competition.slug] = data.items.filter(item => item.competitionSlug === competition.slug).length
  })

  return counts
}

export const getCompetitionMatches = async slug => {
  const data = await getTodayPredictions()

  return data.items.filter(item => item.competitionSlug === slug)
}
