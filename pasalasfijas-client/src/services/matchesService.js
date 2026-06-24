import { apiClient } from '@/lib/apiClient'
import { mockTodayPredictions } from '@/data/mock/predictions'
import { resolveCountryCode } from '@/lib/country/resolveCountryCode'

const shouldUseMock = () => process.env.NEXT_PUBLIC_USE_MOCKS !== 'false'

const enrichMatchItem = (item, matchNumber) => ({
  ...item,
  matchNumber: item.matchNumber ?? matchNumber ?? null,
  homeCountryCode: resolveCountryCode(item.homeTeam, item.homeCountryCode),
  awayCountryCode: resolveCountryCode(item.awayTeam, item.awayCountryCode),
  venue: item.venue ?? null,
  homeScore: item.homeScore ?? null,
  awayScore: item.awayScore ?? null
})

const mockTodayMatches = () => ({
  items: mockTodayPredictions.items.map(item => ({
    id: item.id,
    homeTeam: item.homeTeam,
    homeCountryCode: item.homeCountryCode,
    awayTeam: item.awayTeam,
    awayCountryCode: item.awayCountryCode,
    competition: item.competition,
    competitionSlug: item.competitionSlug,
    kickoffAt: item.kickoffAt,
    status: item.status,
    stageLabel: item.stageLabel,
    analysis: item.analysis
      ? {
          confidence: item.analysis.confidence,
          riskScore: item.analysis.riskScore
        }
      : null
  }))
})

export const getTodayMatches = async () => {
  if (shouldUseMock()) return mockTodayMatches()

  return apiClient('/matches/today')
}

export const getCompetitionMatches = async competitionSlug => {
  if (shouldUseMock()) {
    const data = mockTodayMatches()

    return {
      items: data.items
        .filter(item => item.competitionSlug === competitionSlug)
        .map((item, index) => enrichMatchItem(item, index + 1))
    }
  }

  const data = await apiClient(`/matches?competition=${encodeURIComponent(competitionSlug)}`)

  return {
    items: data.items.map((item, index) => enrichMatchItem(item, item.matchNumber ?? index + 1))
  }
}
