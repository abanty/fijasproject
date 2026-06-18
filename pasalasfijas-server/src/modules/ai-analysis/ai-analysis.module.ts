import { Module } from '@nestjs/common'
import { AiPredictionValidatorService } from './application/services/ai-prediction-validator.service'
import { ValidateAiPredictionUseCase } from './application/use-cases/validate-ai-prediction.use-case'
import { AI_PREDICTION_PROVIDER } from './domain/ports/ai-prediction-provider.port'
import { OpenAiPredictionProvider } from './infrastructure/openai/openai-prediction.provider'
import { AiAnalysisController } from './presentation/controllers/ai-analysis.controller'

@Module({
  controllers: [AiAnalysisController],
  providers: [
    AiPredictionValidatorService,
    ValidateAiPredictionUseCase,
    { provide: AI_PREDICTION_PROVIDER, useClass: OpenAiPredictionProvider },
  ],
  exports: [AI_PREDICTION_PROVIDER, AiPredictionValidatorService],
})
export class AiAnalysisModule {}
