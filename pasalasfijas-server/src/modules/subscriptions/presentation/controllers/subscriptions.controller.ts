import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { CurrentUser, type CurrentUserPayload } from '../../../../shared/security/current-user.decorator'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { GetCurrentSubscriptionUseCase } from '../../application/use-cases/get-current-subscription.use-case'
import { UpgradeSubscriptionUseCase } from '../../application/use-cases/upgrade-subscription.use-case'
import { UpgradeSubscriptionDto } from '../dto/upgrade-subscription.dto'

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly getCurrentSubscriptionUseCase: GetCurrentSubscriptionUseCase,
    private readonly upgradeSubscriptionUseCase: UpgradeSubscriptionUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: CurrentUserPayload) {
    return this.getCurrentSubscriptionUseCase.execute(user.sub)
  }

  @UseGuards(JwtAuthGuard)
  @Post('upgrade')
  upgrade(@CurrentUser() user: CurrentUserPayload, @Body() dto: UpgradeSubscriptionDto) {
    return this.upgradeSubscriptionUseCase.execute(user.sub, dto.planCode)
  }
}
