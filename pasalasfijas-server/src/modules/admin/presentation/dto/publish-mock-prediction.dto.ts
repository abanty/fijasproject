import { ConfidenceLevel, PickMarket } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator'

class AdminMainPickDto {
  @IsEnum(PickMarket)
  market!: PickMarket

  @IsString()
  selection!: string

  @IsOptional()
  @IsNumber()
  odd?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  stake?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  valueScore?: number
}

export class PublishMockPredictionDto {
  @IsEnum(ConfidenceLevel)
  confidence!: ConfidenceLevel

  @IsInt()
  @Min(0)
  @Max(100)
  riskScore!: number

  @IsString()
  summary!: string

  @IsOptional()
  @IsString()
  reasonToBet?: string

  @IsOptional()
  @IsString()
  reasonToAvoid?: string

  @ValidateNested()
  @Type(() => AdminMainPickDto)
  mainPick!: AdminMainPickDto
}
