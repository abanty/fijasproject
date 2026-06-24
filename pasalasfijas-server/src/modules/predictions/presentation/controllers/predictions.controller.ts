import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import { CurrentUser, type CurrentUserPayload } from '../../../../shared/security/current-user.decorator'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { GetMatchPredictionUseCase } from '../../application/use-cases/get-match-prediction.use-case'
import { GetPredictionHistoryUseCase } from '../../application/use-cases/get-prediction-history.use-case'
import { GetTodayPredictionsUseCase } from '../../application/use-cases/get-today-predictions.use-case'

@Controller('predictions')
export class PredictionsController {
  constructor(
    private readonly getTodayPredictionsUseCase: GetTodayPredictionsUseCase,
    private readonly getMatchPredictionUseCase: GetMatchPredictionUseCase,
    private readonly getPredictionHistoryUseCase: GetPredictionHistoryUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('today')
  today(@CurrentUser() user: CurrentUserPayload) {
    return this.getTodayPredictionsUseCase.execute(user.sub)
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  history(@CurrentUser() user: CurrentUserPayload) {
    return this.getPredictionHistoryUseCase.execute(user.sub)
  }

  @UseGuards(JwtAuthGuard)
  @Get('matches/:matchId')
  byMatch(@CurrentUser() user: CurrentUserPayload, @Param('matchId', ParseIntPipe) matchId: number) {
    return this.getMatchPredictionUseCase.execute(user.sub, matchId)
  }
}
