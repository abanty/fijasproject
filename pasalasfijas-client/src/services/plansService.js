import { apiClient } from '@/lib/apiClient'

const shouldUseMock = () => process.env.NEXT_PUBLIC_USE_MOCKS !== 'false'

const PLAN_UI = {
  FREE: {
    title: 'Gratis',
    subtitle: 'Ideal para probar el valor diario del analisis IA',
    popularPlan: false,
    planBenefits: [
      '2 predicciones completas por dia',
      'Confianza y riesgo visibles',
      'Picks bloqueados con blur',
      'Historial limitado'
    ]
  },
  PREMIUM: {
    title: 'Premium',
    subtitle: 'Acceso completo a todos los mercados del dia',
    popularPlan: true,
    planBenefits: [
      'Todas las predicciones del dia',
      'Picks alternativos y combinadas',
      'Stake index completo',
      'Historial y rendimiento avanzado',
      'Acceso a recomendaciones NO BET'
    ]
  }
}

export const mapPlansToPricingUI = (plans = [], currentPlanCode = 'FREE') =>
  plans.map(plan => {
    const ui = PLAN_UI[plan.code] ?? {
      title: plan.name,
      subtitle: plan.code,
      popularPlan: false,
      planBenefits: []
    }

    const monthlyPrice = plan.price ?? 0

    return {
      ...ui,
      code: plan.code,
      monthlyPrice,
      currentPlan: plan.code === currentPlanCode,
      yearlyPlan: {
        monthly: monthlyPrice > 0 ? Math.round(monthlyPrice * 0.85 * 100) / 100 : 0,
        annually: monthlyPrice > 0 ? Math.round(monthlyPrice * 0.85 * 12 * 100) / 100 : 0
      }
    }
  })

export const getPlans = async () => {
  if (shouldUseMock()) {
    return {
      items: [
        { code: 'FREE', name: 'Free', price: 0 },
        { code: 'PREMIUM', name: 'Premium', price: 19 }
      ]
    }
  }

  return apiClient('/plans')
}

export const getMySubscription = () => apiClient('/subscriptions/me')

export const upgradeSubscription = planCode =>
  apiClient('/subscriptions/upgrade', {
    method: 'POST',
    body: JSON.stringify({ planCode })
  })

export const getPricingPageData = async () => {
  const [{ items: plans }, subscriptionData] = await Promise.all([
    getPlans(),
    getMySubscription().catch(() => ({ tier: 'FREE', subscription: null }))
  ])

  const currentPlanCode = subscriptionData?.tier ?? 'FREE'

  return mapPlansToPricingUI(plans, currentPlanCode)
}
