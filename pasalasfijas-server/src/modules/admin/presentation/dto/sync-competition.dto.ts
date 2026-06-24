import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { SPORTS_DATA_PROVIDER_IDS } from '../../../football/domain/ports/sports-data.provider.port'

export class SyncCompetitionDto {
  @IsOptional()
  @IsString()
  @IsIn([...SPORTS_DATA_PROVIDER_IDS])
  provider?: (typeof SPORTS_DATA_PROVIDER_IDS)[number]

  @IsOptional()
  @IsInt()
  @Min(0)
  leagueId?: number

  @IsOptional()
  @IsInt()
  @Min(2000)
  season?: number
}
