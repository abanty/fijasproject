import { IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateBankrollDto {
  @IsNumber()
  @Min(1)
  initialAmount!: number

  @IsOptional()
  @IsString()
  currency?: string
}
