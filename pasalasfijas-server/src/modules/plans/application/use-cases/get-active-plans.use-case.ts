import { Inject, Injectable } from '@nestjs/common'
import { PLAN_REPOSITORY, PlanRepository } from '../../domain/repositories/plan.repository'

@Injectable()
export class GetActivePlansUseCase {
  constructor(@Inject(PLAN_REPOSITORY) private readonly planRepository: PlanRepository) {}

  execute() {
    return this.planRepository.findAllActive()
  }
}
