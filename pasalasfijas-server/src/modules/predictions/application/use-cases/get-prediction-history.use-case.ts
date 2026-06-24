import { Inject, Injectable } from '@nestjs/common'
import { PREDICTION_REPOSITORY, type PredictionRepository } from '../../domain/repositories/prediction.repository'
import { mapPickHistoryItem } from '../mappers/map-pick-history-item'
import { PredictionAccessService } from '../services/prediction-access.service'

@Injectable()
export class GetPredictionHistoryUseCase {
  constructor(
    @Inject(PREDICTION_REPOSITORY) private readonly predictionRepository: PredictionRepository,
    private readonly predictionAccessService: PredictionAccessService,
  ) {}

  async execute(userId: number) {
    const access = await this.predictionAccessService.getUserAccessContext(userId)

    if (!access.isPremium) {
      return {
        locked: true,
        reason: 'PREMIUM_REQUIRED',
        items: [],
      }
    }

    const picks = await this.predictionRepository.findHistoryMainPicks()

    return {
      locked: false,
      items: picks.map(mapPickHistoryItem),
    }
  }
}
