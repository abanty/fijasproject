import { IsOptional, IsString, MaxLength } from 'class-validator'

export class AdminTeamDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  externalId?: string

  @IsString()
  @MaxLength(255)
  name!: string

  @IsOptional()
  @IsString()
  @MaxLength(10)
  country?: string
}
