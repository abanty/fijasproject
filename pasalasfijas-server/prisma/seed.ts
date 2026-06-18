import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.plan.upsert({
    where: { code: 'FREE' },
    update: {},
    create: {
      code: 'FREE',
      name: 'Free',
      price: 0,
      currency: 'USD',
      dailyFreePredictions: 2,
      canViewAllPredictions: false,
      canViewCombos: false,
      canViewStake: false,
      canViewHistory: false,
      isActive: true,
    },
  })

  await prisma.plan.upsert({
    where: { code: 'PREMIUM' },
    update: {},
    create: {
      code: 'PREMIUM',
      name: 'Premium',
      price: 9.99,
      currency: 'USD',
      dailyFreePredictions: 999,
      canViewAllPredictions: true,
      canViewCombos: true,
      canViewStake: true,
      canViewHistory: true,
      isActive: true,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
