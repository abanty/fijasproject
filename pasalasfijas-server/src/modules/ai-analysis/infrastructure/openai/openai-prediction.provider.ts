import { Injectable, NotImplementedException } from '@nestjs/common'
import { AiPredictionInput, AiPredictionProvider, AiPredictionResult } from '../../domain/ports/ai-prediction-provider.port'

@Injectable()
export class OpenAiPredictionProvider implements AiPredictionProvider {
  async generatePrediction(_input: AiPredictionInput): Promise<AiPredictionResult> {
    throw new NotImplementedException(
      'OpenAI integration is intentionally prepared but not implemented in this MVP base. Add the official OpenAI SDK when ready.',
    )
  }
}
