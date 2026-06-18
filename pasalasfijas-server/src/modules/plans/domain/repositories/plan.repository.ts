import { Plan } from '@prisma/client'

export const PLAN_REPOSITORY = 'PLAN_REPOSITORY'

export interface PlanRepository {
  findAllActive(): Promise<Plan[]>
  findByCode(code: string): Promise<Plan | null>
}
