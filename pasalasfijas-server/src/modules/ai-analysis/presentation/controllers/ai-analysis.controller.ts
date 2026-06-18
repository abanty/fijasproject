import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { Roles } from '../../../../shared/security/roles.decorator'
import { RolesGuard } from '../../../../shared/security/roles.guard'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { ValidateAiPredictionUseCase } from '../../application/use-cases/validate-ai-prediction.use-case'

@Controller('ai-analysis')
export class AiAnalysisController {
  constructor(private readonly validateAiPredictionUseCase: ValidateAiPredictionUseCase) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Post('validate-output')
  validate(@Body() body: Record<string, unknown>) {
    return this.validateAiPredictionUseCase.execute(body)
  }
}
