import { Type } from 'class-transformer'
import { IsDateString, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator'
import { AdminTeamDto } from './admin-team.dto'

class AdminMatchOddsDto {
  @IsNumber()
  home!: number

  @IsNumber()
  draw!: number

  @IsNumber()
  away!: number
}

export class CreateAdminMatchDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  externalId?: string

  @IsOptional()
  @IsString()
  @MaxLength(100)
  competitionExternalId?: string

  @IsString()
  @MaxLength(255)
  competitionName!: string

  @ValidateNested()
  @Type(() => AdminTeamDto)
  homeTeam!: AdminTeamDto

  @ValidateNested()
  @Type(() => AdminTeamDto)
  awayTeam!: AdminTeamDto

  @IsDateString()
  kickoffAt!: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  venue?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => AdminMatchOddsDto)
  odds?: AdminMatchOddsDto
}
