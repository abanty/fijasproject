import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { Roles } from '../../../../shared/security/roles.decorator'
import { RolesGuard } from '../../../../shared/security/roles.guard'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { SyncCompetitionMatchesUseCase } from '../../../football/application/use-cases/sync-competition-matches.use-case'
import { SyncLiveScoresUseCase } from '../../../football/application/use-cases/sync-live-scores.use-case'
import { WORLD_CUP_2026_COMPETITION_EXTERNAL_ID } from '../../../football/domain/ports/sports-data.provider.port'
import { CreateAdminMatchUseCase } from '../../application/use-cases/create-admin-match.use-case'
import { GetAdminHealthUseCase } from '../../application/use-cases/get-admin-health.use-case'
import { PublishMockPredictionUseCase } from '../../application/use-cases/publish-mock-prediction.use-case'
import { CreateAdminMatchDto } from '../dto/create-admin-match.dto'
import { PublishMockPredictionDto } from '../dto/publish-mock-prediction.dto'
import { SyncCompetitionDto } from '../dto/sync-competition.dto'
import { SyncLiveScoresDto } from '../dto/sync-live-scores.dto'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly getAdminHealthUseCase: GetAdminHealthUseCase,
    private readonly createAdminMatchUseCase: CreateAdminMatchUseCase,
    private readonly publishMockPredictionUseCase: PublishMockPredictionUseCase,
    private readonly syncCompetitionMatchesUseCase: SyncCompetitionMatchesUseCase,
    private readonly syncLiveScoresUseCase: SyncLiveScoresUseCase,
  ) {}

  @Get('health')
  health() {
    return this.getAdminHealthUseCase.execute()
  }

  @Get('sports-data/status')
  sportsDataStatus() {
    return {
      fixtureProviders: this.syncCompetitionMatchesUseCase.getProvidersStatus(),
      liveScoreProviders: this.syncLiveScoresUseCase.getProvidersStatus(),
    }
  }

  @Post('sync/competition')
  syncCompetition(@Body() dto: SyncCompetitionDto) {
    const provider = dto.provider ?? 'api-football'
    const leagueId = dto.leagueId ?? (provider === 'open-football' ? 0 : 1)
    const season = dto.season ?? 2026

    return this.syncCompetitionMatchesUseCase.execute({ provider, leagueId, season })
  }

  @Post('sync/live-scores')
  syncLiveScores(@Body() dto: SyncLiveScoresDto) {
    return this.syncLiveScoresUseCase.execute({
      provider: dto.provider ?? 'world-cup-26',
      competitionExternalId:
        dto.competitionExternalId ?? WORLD_CUP_2026_COMPETITION_EXTERNAL_ID,
    })
  }

  @Post('matches')
  createMatch(@Body() dto: CreateAdminMatchDto) {
    return this.createAdminMatchUseCase.execute(dto)
  }

  @Post('matches/:matchId/predictions')
  publishPrediction(
    @Param('matchId', ParseIntPipe) matchId: number,
    @Body() dto: PublishMockPredictionDto,
  ) {
    return this.publishMockPredictionUseCase.execute(matchId, dto)
  }
}
