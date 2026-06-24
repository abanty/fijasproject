import { Inject, Injectable } from '@nestjs/common'
import { MATCH_REPOSITORY, type MatchRepository } from '../../domain/repositories/match.repository'
import { mapMatchItem } from '../mappers/map-match-item'

@Injectable()
export class GetTodayMatchesUseCase {
  constructor(@Inject(MATCH_REPOSITORY) private readonly matchRepository: MatchRepository) {}

  async execute(referenceDate = new Date()) {
    const matches = await this.matchRepository.findToday(referenceDate)

    return {
      items: matches.map(mapMatchItem),
    }
  }
}
