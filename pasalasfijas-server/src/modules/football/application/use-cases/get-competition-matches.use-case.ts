import { Inject, Injectable } from '@nestjs/common'
import { MATCH_REPOSITORY, type MatchRepository } from '../../domain/repositories/match.repository'
import { mapMatchItem } from '../mappers/map-match-item'

@Injectable()
export class GetCompetitionMatchesUseCase {
  constructor(@Inject(MATCH_REPOSITORY) private readonly matchRepository: MatchRepository) {}

  async execute(competitionExternalId: string) {
    const matches = await this.matchRepository.findByCompetitionExternalId(competitionExternalId)

    return {
      items: matches.map((match, index) => mapMatchItem(match, index + 1)),
    }
  }
}
