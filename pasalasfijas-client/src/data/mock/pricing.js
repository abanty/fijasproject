export const mockPricingPlans = [
  {
    title: 'Gratis',
    monthlyPrice: 0,
    currentPlan: true,
    popularPlan: false,
    subtitle: 'Ideal para probar el valor diario del analisis IA',
    imgSrc: '/images/illustrations/objects/pricing-basic.png',
    imgHeight: 120,
    yearlyPlan: {
      monthly: 0,
      annually: 0
    },
    planBenefits: [
      '2 predicciones completas por dia',
      'Confianza y riesgo visibles',
      'Picks bloqueados con blur',
      'Historial limitado'
    ]
  },
  {
    title: 'Premium',
    monthlyPrice: 19,
    popularPlan: true,
    currentPlan: false,
    subtitle: 'Acceso completo a todos los mercados del dia',
    imgSrc: '/images/illustrations/objects/pricing-standard.png',
    imgHeight: 120,
    yearlyPlan: {
      monthly: 15,
      annually: 180
    },
    planBenefits: [
      'Todas las predicciones del dia',
      'Picks alternativos y combinadas',
      'Stake index completo',
      'Historial y rendimiento avanzado',
      'Acceso a recomendaciones NO BET'
    ]
  }
]
