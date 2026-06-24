import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  LiveScoreProvider,
  LiveScoreProviderId,
  LiveScoreProviderStatus,
  LiveScoreUpdate,
} from '../../domain/ports/live-score.provider.port'
import {
  mapWorldCup26Games,
  type WorldCup26GamesResponse,
} from '../mappers/world-cup-26.mapper'

const DEFAULT_BASE_URL = 'https://worldcup26.ir'

@Injectable()
export class WorldCup26LiveScoreProvider implements LiveScoreProvider {
  readonly id: LiveScoreProviderId = 'world-cup-26'

  constructor(private readonly configService: ConfigService) {}

  private get baseUrl() {
    return this.configService.get<string>('WORLDCUP26_BASE_URL') ?? DEFAULT_BASE_URL
  }

  getStatus(): LiveScoreProviderStatus {
    return {
      configured: true,
      provider: this.id,
      message: 'WorldCup26 API (worldcup26.ir). Backup live para Mundial 2026. Sin API key.',
    }
  }

  async fetchLiveScores(): Promise<LiveScoreUpdate[]> {
    const response = await fetch(`${this.baseUrl}/get/games`, {
      headers: { accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`WorldCup26 respondio ${response.status}`)
    }

    const body = (await response.json()) as WorldCup26GamesResponse
    return mapWorldCup26Games(body)
  }
}
