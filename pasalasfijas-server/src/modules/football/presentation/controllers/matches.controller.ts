import { Controller, Get } from '@nestjs/common'
import { GetTodayMatchesUseCase } from '../../application/use-cases/get-today-matches.use-case'

@Controller('matches')
export class MatchesController {
  constructor(private readonly getTodayMatchesUseCase: GetTodayMatchesUseCase) {}

  @Get('today')
  today() {
    return this.getTodayMatchesUseCase.execute()
  }
}
