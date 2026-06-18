import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PREDICTION_REPOSITORY, PredictionRepository } from '../../domain/repositories/prediction.repository'
import { PredictionAccessService } from '../services/prediction-access.service'

@Injectable()
export class GetMatchPredictionUseCase {
  constructor(
    @Inject(PREDICTION_REPOSITORY) private readonly predictionRepository: PredictionRepository,
    private readonly predictionAccessService: PredictionAccessService,
  ) {}

  async execute(userId: string, matchId: string) {
    const prediction = await this.predictionRepository.findByMatchId(matchId)
    if (!prediction) throw new NotFoundException('Prediction not found')

    const access = await this.predictionAccessService.canViewPrediction(userId, matchId)
    if (!access.allowed) {
      return {
        locked: true,
        reason: access.reason,
        preview: {
          matchId,
          confidence: prediction.confidence,
          riskScore: prediction.riskScore,
          marketsAnalyzed: prediction.picks.length,
        },
      }
    }

    return { locked: false, prediction }
  }
}
