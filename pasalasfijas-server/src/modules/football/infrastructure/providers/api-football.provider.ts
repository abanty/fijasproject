import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MatchStatus } from '@prisma/client'
import {
  SportsDataFixture,
  SportsDataProvider,
  SportsDataProviderId,
  SportsDataProviderStatus,
} from '../../domain/ports/sports-data.provider.port'

type ApiFootballFixtureResponse = {
  errors?: Record<string, string>
  results?: number
  response: Array<{
    fixture: {
      id: number
      date: string
      status: { short: string }
      venue?: { name?: string | null }
    }
    league: {
      id: number
      name: string
      country: string
    }
    teams: {
      home: { id: number; name: string; country?: string | null }
      away: { id: number; name: string; country?: string | null }
    }
    goals: { home: number | null; away: number | null }
  }>
}

const STATUS_MAP: Record<string, MatchStatus> = {
  NS: MatchStatus.SCHEDULED,
  TBD: MatchStatus.SCHEDULED,
  '1H': MatchStatus.LIVE,
  HT: MatchStatus.LIVE,
  '2H': MatchStatus.LIVE,
  ET: MatchStatus.LIVE,
  BT: MatchStatus.LIVE,
  P: MatchStatus.LIVE,
  FT: MatchStatus.FINISHED,
  AET: MatchStatus.FINISHED,
  PEN: MatchStatus.FINISHED,
  PST: MatchStatus.POSTPONED,
  CANC: MatchStatus.CANCELLED,
  ABD: MatchStatus.CANCELLED,
}

@Injectable()
export class ApiFootballProvider implements SportsDataProvider {
  readonly id: SportsDataProviderId = 'api-football'
  private readonly baseUrl = 'https://v3.football.api-sports.io'

  constructor(private readonly configService: ConfigService) {}

  private get apiKey() {
    return this.configService.get<string>('FOOTBALL_API_KEY')
  }

  getStatus(): SportsDataProviderStatus {
    if (!this.apiKey) {
      return {
        configured: false,
        provider: this.id,
        message: 'Falta FOOTBALL_API_KEY en .env. Registrate en https://dashboard.api-football.com',
      }
    }

    const leagueId = Number(this.configService.get<string>('FOOTBALL_API_LEAGUE_ID') ?? 1)
    const season = Number(this.configService.get<string>('FOOTBALL_API_SEASON') ?? 2026)

    return {
      configured: true,
      provider: this.id,
      message: `API-Football configurada. Objetivo: league=${leagueId}, season=${season}.`,
      defaultLeagueId: leagueId,
      defaultSeason: season,
      freePlanSeasonRange: '2022-2024',
    }
  }

  async fetchFixturesByLeague(leagueId: number, season: number): Promise<SportsDataFixture[]> {
    if (!this.apiKey) {
      throw new Error('FOOTBALL_API_KEY no configurada')
    }

    const url = `${this.baseUrl}/fixtures?league=${leagueId}&season=${season}`
    const response = await fetch(url, {
      headers: {
        'x-apisports-key': this.apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`API-Football respondio ${response.status}`)
    }

    const body = (await response.json()) as ApiFootballFixtureResponse

    if (body.errors && Object.keys(body.errors).length > 0) {
      const detail = Object.values(body.errors).join(' ')
      throw new Error(`API-Football: ${detail}`)
    }

    return body.response.map(item => ({
      externalId: `api-football-${item.fixture.id}`,
      kickoffAt: new Date(item.fixture.date),
      status: STATUS_MAP[item.fixture.status.short] ?? MatchStatus.SCHEDULED,
      venue: item.fixture.venue?.name ?? undefined,
      homeScore: item.goals.home,
      awayScore: item.goals.away,
      homeTeam: {
        externalId: `api-football-team-${item.teams.home.id}`,
        name: item.teams.home.name,
        country: item.teams.home.country ?? undefined,
      },
      awayTeam: {
        externalId: `api-football-team-${item.teams.away.id}`,
        name: item.teams.away.name,
        country: item.teams.away.country ?? undefined,
      },
      competition: {
        externalId: `api-football-league-${item.league.id}`,
        name: item.league.name,
        country: item.league.country,
      },
    }))
  }
}

export const mapSportsStatus = (status: string): MatchStatus =>
  (STATUS_MAP[status] as MatchStatus | undefined) ?? MatchStatus.SCHEDULED
