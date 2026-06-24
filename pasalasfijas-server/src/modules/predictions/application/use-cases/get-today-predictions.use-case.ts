import { Inject, Injectable } from '@nestjs/common'
import { PREDICTION_REPOSITORY, type PredictionRepository } from '../../domain/repositories/prediction.repository'
import { mapPredictionItem } from '../mappers/map-prediction-item'
import { PredictionAccessService } from '../services/prediction-access.service'

@Injectable()
export class GetTodayPredictionsUseCase {
  constructor(
    @Inject(PREDICTION_REPOSITORY) private readonly predictionRepository: PredictionRepository,
    private readonly predictionAccessService: PredictionAccessService,
  ) {}

  async execute(userId: number, referenceDate = new Date()) {
    let access = await this.predictionAccessService.getUserAccessContext(userId, referenceDate)
    const bundles = await this.predictionRepository.findTodayPublished(referenceDate)

    if (!access.isPremium) {
      for (const bundle of bundles) {
        if (access.viewedMatchIds.has(bundle.matchId)) continue
        if (access.todayViewsCount >= access.dailyLimit) break

        await this.predictionAccessService.canViewPrediction(userId, bundle.matchId)
        access = await this.predictionAccessService.getUserAccessContext(userId, referenceDate)
      }
    }

    const items = bundles.map(bundle => {
      const isLocked = !access.isPremium && !access.viewedMatchIds.has(bundle.matchId)

      return mapPredictionItem(bundle, isLocked)
    })

    return {
      items,
      freeUnlocksUsed: access.todayViewsCount,
      freeUnlocksLimit: access.dailyLimit,
    }
  }
}
