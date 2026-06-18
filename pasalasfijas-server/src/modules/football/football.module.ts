import { Module } from '@nestjs/common'
import { GetTodayMatchesUseCase } from './application/use-cases/get-today-matches.use-case'
import { MATCH_REPOSITORY } from './domain/repositories/match.repository'
import { PrismaMatchRepository } from './infrastructure/prisma/prisma-match.repository'
import { MatchesController } from './presentation/controllers/matches.controller'

@Module({
  controllers: [MatchesController],
  providers: [
    GetTodayMatchesUseCase,
    { provide: MATCH_REPOSITORY, useClass: PrismaMatchRepository },
  ],
  exports: [MATCH_REPOSITORY, GetTodayMatchesUseCase],
})
export class FootballModule {}
