import { Module } from '@nestjs/common'
import { PLAN_REPOSITORY } from './domain/repositories/plan.repository'
import { PrismaPlanRepository } from './infrastructure/prisma/prisma-plan.repository'
import { GetActivePlansUseCase } from './application/use-cases/get-active-plans.use-case'
import { PlansController } from './presentation/controllers/plans.controller'

@Module({
  controllers: [PlansController],
  providers: [
    GetActivePlansUseCase,
    { provide: PLAN_REPOSITORY, useClass: PrismaPlanRepository },
  ],
  exports: [PLAN_REPOSITORY],
})
export class PlansModule {}
