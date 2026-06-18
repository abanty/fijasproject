import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { CurrentUser, CurrentUserPayload } from '../../../../shared/security/current-user.decorator'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { GetMatchPredictionUseCase } from '../../application/use-cases/get-match-prediction.use-case'
import { GetTodayPredictionsUseCase } from '../../application/use-cases/get-today-predictions.use-case'

@Controller('predictions')
export class PredictionsController {
  constructor(
    private readonly getTodayPredictionsUseCase: GetTodayPredictionsUseCase,
    private readonly getMatchPredictionUseCase: GetMatchPredictionUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('today')
  today() {
    return this.getTodayPredictionsUseCase.execute()
  }

  @UseGuards(JwtAuthGuard)
  @Get('matches/:matchId')
  byMatch(@CurrentUser() user: CurrentUserPayload, @Param('matchId') matchId: string) {
    return this.getMatchPredictionUseCase.execute(user.sub, matchId)
  }
}
