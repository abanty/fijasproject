export const SPORTS_DATA_PROVIDER_IDS = ['api-football', 'open-football'] as const

export type SportsDataProviderId = (typeof SPORTS_DATA_PROVIDER_IDS)[number]

export const WORLD_CUP_2026_COMPETITION_EXTERNAL_ID = 'world-cup-2026'

export type SportsDataFixture = {
  externalId: string
  kickoffAt: Date
  status: string
  venue?: string
  stageLabel?: string
  homeScore?: number | null
  awayScore?: number | null
  homeTeam: {
    externalId: string
    name: string
    country?: string
  }
  awayTeam: {
    externalId: string
    name: string
    country?: string
  }
  competition: {
    externalId: string
    name: string
    country?: string
  }
  odds?: {
    home?: number
    draw?: number
    away?: number
  }
}

export type SportsDataProviderStatus = {
  configured: boolean
  provider: string
  message: string
  defaultLeagueId?: number
  defaultSeason?: number
  freePlanSeasonRange?: string
}

export interface SportsDataProvider {
  readonly id: SportsDataProviderId
  getStatus(): SportsDataProviderStatus
  fetchFixturesByLeague(leagueId: number, season: number): Promise<SportsDataFixture[]>
}
