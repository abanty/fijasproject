import { Inject, Injectable } from '@nestjs/common'
import { PLAN_REPOSITORY, type PlanRepository } from '../../domain/repositories/plan.repository'
import { mapPlanItem } from '../mappers/map-plan-item'

@Injectable()
export class GetActivePlansUseCase {
  constructor(@Inject(PLAN_REPOSITORY) private readonly planRepository: PlanRepository) {}

  async execute() {
    const plans = await this.planRepository.findAllActive()

    return {
      items: plans.map(mapPlanItem),
    }
  }
}
