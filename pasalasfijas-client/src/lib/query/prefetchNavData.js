import { getBankrollSummary } from '@/services/bankrollService'
import { getCompetitionMatches, loadCompetitionsPageData } from '@/services/competitionsService'
import { getPredictionHistory, getTodayPredictions } from '@/services/predictionsService'

import { prefetchQuery } from '@/lib/query/queryCache'
import { queryKeys } from '@/lib/query/queryKeys'

const prefetchTodayPredictions = () =>
  prefetchQuery(queryKeys.predictions.today, getTodayPredictions)

const prefetchByPath = {
  '/dashboard': prefetchTodayPredictions,
  '/home': prefetchTodayPredictions,
  '/predictions': prefetchTodayPredictions,
  '/matches': () => prefetchQuery(queryKeys.competitions.matchCounts, loadCompetitionsPageData),
  '/history': () => prefetchQuery(queryKeys.predictions.history, getPredictionHistory),
  '/bankroll': () => prefetchQuery(queryKeys.bankroll.summary, getBankrollSummary)
}

export const prefetchNavData = href => {
  if (!href || typeof href !== 'string') return

  const path = href.split('?')[0]
  const prefetch = prefetchByPath[path]

  if (prefetch) prefetch()

  const competitionMatch = path.match(/^\/matches\/([^/]+)$/)

  if (competitionMatch) {
    const slug = competitionMatch[1]

    prefetchQuery(queryKeys.competitions.matches(slug), () =>
      getCompetitionMatches(slug).then(result => result.items)
    )
  }
}

const CORE_ROUTE_PATHS = ['/dashboard', '/predictions', '/matches']

export const prefetchCoreRoutes = () => {
  CORE_ROUTE_PATHS.forEach(path => {
    const prefetch = prefetchByPath[path]
    if (prefetch) prefetch()
  })
}
