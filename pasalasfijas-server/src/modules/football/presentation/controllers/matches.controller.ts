import { Controller, Get, Query } from '@nestjs/common'
import { GetCompetitionMatchesUseCase } from '../../application/use-cases/get-competition-matches.use-case'
import { GetTodayMatchesUseCase } from '../../application/use-cases/get-today-matches.use-case'

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly getTodayMatchesUseCase: GetTodayMatchesUseCase,
    private readonly getCompetitionMatchesUseCase: GetCompetitionMatchesUseCase,
  ) {}

  @Get('today')
  today() {
    return this.getTodayMatchesUseCase.execute()
  }

  @Get()
  byCompetition(@Query('competition') competition?: string) {
    if (!competition?.trim()) {
      return { items: [] }
    }

    return this.getCompetitionMatchesUseCase.execute(competition.trim())
  }
}
