import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser, CurrentUserPayload } from '../../../../shared/security/current-user.decorator'
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard'
import { GetCurrentSubscriptionUseCase } from '../../application/use-cases/get-current-subscription.use-case'

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly getCurrentSubscriptionUseCase: GetCurrentSubscriptionUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: CurrentUserPayload) {
    return this.getCurrentSubscriptionUseCase.execute(user.sub)
  }
}
