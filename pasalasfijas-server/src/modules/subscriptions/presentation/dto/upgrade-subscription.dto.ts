import { IsIn, IsString } from 'class-validator'

export class UpgradeSubscriptionDto {
  @IsString()
  @IsIn(['PREMIUM'])
  planCode!: 'PREMIUM'
}
