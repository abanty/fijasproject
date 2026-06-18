import { Inject, Injectable } from '@nestjs/common'
import { MATCH_REPOSITORY, MatchRepository } from '../../domain/repositories/match.repository'

@Injectable()
export class GetTodayMatchesUseCase {
  constructor(@Inject(MATCH_REPOSITORY) private readonly matchRepository: MatchRepository) {}

  execute(referenceDate = new Date()) {
    return this.matchRepository.findToday(referenceDate)
  }
}
