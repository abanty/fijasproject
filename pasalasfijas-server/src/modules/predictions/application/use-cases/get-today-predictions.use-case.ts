import { Inject, Injectable } from '@nestjs/common'
import { PREDICTION_REPOSITORY, PredictionRepository } from '../../domain/repositories/prediction.repository'

@Injectable()
export class GetTodayPredictionsUseCase {
  constructor(@Inject(PREDICTION_REPOSITORY) private readonly predictionRepository: PredictionRepository) {}

  execute() {
    return this.predictionRepository.findTodayPublished(new Date())
  }
}
