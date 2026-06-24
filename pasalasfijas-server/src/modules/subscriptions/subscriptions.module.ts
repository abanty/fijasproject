import { Module } from '@nestjs/common'
import { PlansModule } from '../plans/plans.module'
import { GetCurrentSubscriptionUseCase } from './application/use-cases/get-current-subscription.use-case'
import { UpgradeSubscriptionUseCase } from './application/use-cases/upgrade-subscription.use-case'
import { SUBSCRIPTION_REPOSITORY } from './domain/repositories/subscription.repository'
import { PrismaSubscriptionRepository } from './infrastructure/prisma/prisma-subscription.repository'
import { SubscriptionsController } from './presentation/controllers/subscriptions.controller'

@Module({
  imports: [PlansModule],
  controllers: [SubscriptionsController],
  providers: [
    GetCurrentSubscriptionUseCase,
    UpgradeSubscriptionUseCase,
    { provide: SUBSCRIPTION_REPOSITORY, useClass: PrismaSubscriptionRepository },
  ],
  exports: [GetCurrentSubscriptionUseCase, SUBSCRIPTION_REPOSITORY],
})
export class SubscriptionsModule {}
