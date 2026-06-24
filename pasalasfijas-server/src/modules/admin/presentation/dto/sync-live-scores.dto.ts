import { IsIn, IsOptional, IsString } from 'class-validator'
import { LIVE_SCORE_PROVIDER_IDS } from '../../../football/domain/ports/live-score.provider.port'

export class SyncLiveScoresDto {
  @IsOptional()
  @IsString()
  @IsIn([...LIVE_SCORE_PROVIDER_IDS])
  provider?: (typeof LIVE_SCORE_PROVIDER_IDS)[number]

  @IsOptional()
  @IsString()
  competitionExternalId?: string
}
