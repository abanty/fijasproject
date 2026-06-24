import { Module } from '@nestjs/common'
import { PredictionAccessService } from './application/services/prediction-access.service'
import { GetMatchPredictionUseCase } from './application/use-cases/get-match-prediction.use-case'
import { GetPredictionHistoryUseCase } from './application/use-cases/get-prediction-history.use-case'
import { GetTodayPredictionsUseCase } from './application/use-cases/get-today-predictions.use-case'
import { PREDICTION_REPOSITORY } from './domain/repositories/prediction.repository'
import { PrismaPredictionRepository } from './infrastructure/prisma/prisma-prediction.repository'
import { PredictionsController } from './presentation/controllers/predictions.controller'

@Module({
  controllers: [PredictionsController],
  providers: [
    PredictionAccessService,
    GetTodayPredictionsUseCase,
    GetMatchPredictionUseCase,
    GetPredictionHistoryUseCase,
    { provide: PREDICTION_REPOSITORY, useClass: PrismaPredictionRepository },
  ],
  exports: [PredictionAccessService, PREDICTION_REPOSITORY],
})
export class PredictionsModule {}
