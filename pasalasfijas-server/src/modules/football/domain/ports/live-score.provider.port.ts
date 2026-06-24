import { MatchStatus } from '@prisma/client'

export const LIVE_SCORE_PROVIDER_IDS = ['world-cup-26'] as const

export type LiveScoreProviderId = (typeof LIVE_SCORE_PROVIDER_IDS)[number]

export type LiveScoreUpdate = {
  sourceEventId: string
  homeTeamName: string
  awayTeamName: string
  homeScore: number | null
  awayScore: number | null
  status: MatchStatus
}

export type LiveScoreProviderStatus = {
  configured: boolean
  provider: string
  message: string
}

export interface LiveScoreProvider {
  readonly id: LiveScoreProviderId
  getStatus(): LiveScoreProviderStatus
  fetchLiveScores(): Promise<LiveScoreUpdate[]>
}
