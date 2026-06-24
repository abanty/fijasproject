import { Plan } from '@prisma/client'

export const mapPlanItem = (plan: Plan) => ({
  id: plan.id,
  code: plan.code,
  name: plan.name,
  price: Number(plan.price),
  currency: plan.currency,
  dailyFreePredictions: plan.dailyFreePredictions,
  canViewAllPredictions: plan.canViewAllPredictions,
  canViewCombos: plan.canViewCombos,
  canViewStake: plan.canViewStake,
  canViewHistory: plan.canViewHistory,
})
