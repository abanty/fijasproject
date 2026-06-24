import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PREDICTION_REPOSITORY, type PredictionRepository } from '../../domain/repositories/prediction.repository'
import { mapPredictionItem } from '../mappers/map-prediction-item'
import { PredictionAccessService } from '../services/prediction-access.service'

@Injectable()
export class GetMatchPredictionUseCase {
  constructor(
    @Inject(PREDICTION_REPOSITORY) private readonly predictionRepository: PredictionRepository,
    private readonly predictionAccessService: PredictionAccessService,
  ) {}

  async execute(userId: number, matchId: number) {
    const bundle = await this.predictionRepository.findByMatchId(matchId)
    if (!bundle) throw new NotFoundException('Prediction not found')

    const access = await this.predictionAccessService.canViewPrediction(userId, matchId)
    if (!access.allowed) {
      return {
        locked: true,
        reason: access.reason,
        preview: {
          matchId,
          confidence: bundle.confidence,
          riskScore: bundle.riskScore,
          marketsAnalyzed: bundle.picks.length,
        },
      }
    }

    return {
      locked: false,
      prediction: mapPredictionItem(bundle, false),
    }
  }
}
