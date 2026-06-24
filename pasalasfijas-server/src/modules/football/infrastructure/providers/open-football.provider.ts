import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  SportsDataFixture,
  SportsDataProvider,
  SportsDataProviderId,
  SportsDataProviderStatus,
} from '../../domain/ports/sports-data.provider.port'
import {
  mapOpenFootballResponse,
  type OpenFootballResponse,
} from '../mappers/open-football.mapper'

const DEFAULT_BASE_URL =
  'https://raw.githubusercontent.com/openfootball/worldcup.json/master'

@Injectable()
export class OpenFootballProvider implements SportsDataProvider {
  readonly id: SportsDataProviderId = 'open-football'

  constructor(private readonly configService: ConfigService) {}

  private get baseUrl() {
    return this.configService.get<string>('OPENFOOTBALL_BASE_URL') ?? DEFAULT_BASE_URL
  }

  getStatus(): SportsDataProviderStatus {
    return {
      configured: true,
      provider: this.id,
      message: 'Open Football (GitHub). Sin API key. Mundial 2026 y otras temporadas en worldcup.json.',
      defaultLeagueId: 0,
      defaultSeason: 2026,
    }
  }

  async fetchFixturesByLeague(_leagueId: number, season: number): Promise<SportsDataFixture[]> {
    const url = `${this.baseUrl}/${season}/worldcup.json`
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`Open Football respondio ${response.status} para season=${season}`)
    }

    const body = (await response.json()) as OpenFootballResponse
    return mapOpenFootballResponse(body, season)
  }
}
