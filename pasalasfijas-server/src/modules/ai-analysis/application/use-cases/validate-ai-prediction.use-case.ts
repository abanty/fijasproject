import { Injectable } from '@nestjs/common'
import { AiPredictionValidatorService } from '../services/ai-prediction-validator.service'

@Injectable()
export class ValidateAiPredictionUseCase {
  constructor(private readonly validator: AiPredictionValidatorService) {}

  execute(output: Record<string, unknown>) {
    return this.validator.validate(output)
  }
}
