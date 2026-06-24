import { Module } from '@nestjs/common'
import { GetCompetitionMatchesUseCase } from './application/use-cases/get-competition-matches.use-case'
import { GetTodayMatchesUseCase } from './application/use-cases/get-today-matches.use-case'
import { SyncCompetitionMatchesUseCase } from './application/use-cases/sync-competition-matches.use-case'
import { SyncLiveScoresUseCase } from './application/use-cases/sync-live-scores.use-case'
import { MATCH_REPOSITORY } from './domain/repositories/match.repository'
import { PrismaMatchRepository } from './infrastructure/prisma/prisma-match.repository'
import { ApiFootballProvider } from './infrastructure/providers/api-football.provider'
import { LiveScoreProviderRegistry } from './infrastructure/providers/live-score-provider.registry'
import { OpenFootballProvider } from './infrastructure/providers/open-football.provider'
import { SportsDataProviderRegistry } from './infrastructure/providers/sports-data-provider.registry'
import { WorldCup26LiveScoreProvider } from './infrastructure/providers/world-cup-26-live-score.provider'
import { MatchesController } from './presentation/controllers/matches.controller'

@Module({
  controllers: [MatchesController],
  providers: [
    GetTodayMatchesUseCase,
    GetCompetitionMatchesUseCase,
    SyncCompetitionMatchesUseCase,
    SyncLiveScoresUseCase,
    ApiFootballProvider,
    OpenFootballProvider,
    WorldCup26LiveScoreProvider,
    SportsDataProviderRegistry,
    LiveScoreProviderRegistry,
    { provide: MATCH_REPOSITORY, useClass: PrismaMatchRepository },
  ],
  exports: [
    MATCH_REPOSITORY,
    GetTodayMatchesUseCase,
    GetCompetitionMatchesUseCase,
    SyncCompetitionMatchesUseCase,
    SyncLiveScoresUseCase,
  ],
})
export class FootballModule {}
