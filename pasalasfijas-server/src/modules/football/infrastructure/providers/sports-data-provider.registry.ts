import { Injectable } from '@nestjs/common'
import {
  SportsDataProvider,
  SportsDataProviderId,
  SportsDataProviderStatus,
} from '../../domain/ports/sports-data.provider.port'
import { ApiFootballProvider } from './api-football.provider'
import { OpenFootballProvider } from './open-football.provider'

@Injectable()
export class SportsDataProviderRegistry {
  private readonly providers: Map<SportsDataProviderId, SportsDataProvider>

  constructor(
    apiFootballProvider: ApiFootballProvider,
    openFootballProvider: OpenFootballProvider,
  ) {
    this.providers = new Map<SportsDataProviderId, SportsDataProvider>([
      [apiFootballProvider.id, apiFootballProvider],
      [openFootballProvider.id, openFootballProvider],
    ])
  }

  get(id: SportsDataProviderId): SportsDataProvider {
    const provider = this.providers.get(id)
    if (!provider) {
      throw new Error(`Proveedor deportivo desconocido: ${id}`)
    }
    return provider
  }

  getAllStatus(): SportsDataProviderStatus[] {
    return [...this.providers.values()].map(provider => provider.getStatus())
  }
}
