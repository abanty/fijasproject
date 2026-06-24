import { Injectable } from '@nestjs/common'
import {
  LiveScoreProvider,
  LiveScoreProviderId,
  LiveScoreProviderStatus,
} from '../../domain/ports/live-score.provider.port'
import { WorldCup26LiveScoreProvider } from './world-cup-26-live-score.provider'

@Injectable()
export class LiveScoreProviderRegistry {
  private readonly providers: Map<LiveScoreProviderId, LiveScoreProvider>

  constructor(worldCup26LiveScoreProvider: WorldCup26LiveScoreProvider) {
    this.providers = new Map<LiveScoreProviderId, LiveScoreProvider>([
      [worldCup26LiveScoreProvider.id, worldCup26LiveScoreProvider],
    ])
  }

  get(id: LiveScoreProviderId): LiveScoreProvider {
    const provider = this.providers.get(id)
    if (!provider) {
      throw new Error(`Proveedor live desconocido: ${id}`)
    }
    return provider
  }

  getAllStatus(): LiveScoreProviderStatus[] {
    return [...this.providers.values()].map(provider => provider.getStatus())
  }
}
