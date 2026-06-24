import {
  AnalysisStatus,
  ConfidenceLevel,
  Pick,
  PickMarket,
  PickResultStatus,
  PickType,
  PrismaClient,
} from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const DEV_USER = {
  email: 'dev@pasalasfijas.com',
  password: 'Dev123456',
  name: 'Dev Local',
}

const ADMIN_USER = {
  email: 'admin@pasalasfijas.com',
  password: 'Admin123456',
  name: 'Admin Local',
}

const kickoffToday = (hours: number, minutes = 0) => {
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

const seedFixtures = [
  {
    externalId: 'seed-match-arg-mex',
    home: { externalId: 'seed-team-arg', name: 'Argentina', country: 'AR' },
    away: { externalId: 'seed-team-mex', name: 'Mexico', country: 'MX' },
    kickoffAt: kickoffToday(20, 0),
    stageLabel: 'Grupo A',
    odds: { home: 2.05, draw: 3.4, away: 3.75 },
    extras: {
      modelProbabilities: { home: 48.2, draw: 26.4, away: 25.4 },
      expectedGoals: { home: 1.74, away: 1.12 },
      favoriteSide: 'home',
    },
    analysis: {
      confidence: ConfidenceLevel.MEDIUM,
      riskScore: 42,
      summary: 'Escenario favorable a mercado de goles moderado, sin forzar ganador.',
      reasonToBet: 'Ambos equipos tienen volumen ofensivo suficiente para sostener una linea baja de goles.',
      reasonToAvoid: 'El ritmo puede bajar si el partido se vuelve tactico.',
    },
    mainPick: {
      market: PickMarket.OVER_UNDER_GOALS,
      selection: 'Over 1.5 goles',
      odd: 1.58,
      valueScore: 61,
      stake: 45,
    },
    altPick: {
      market: PickMarket.DOUBLE_CHANCE,
      selection: 'Argentina o empate',
      odd: 1.36,
      valueScore: 54,
      stake: 35,
      confidence: ConfidenceLevel.MEDIUM,
      riskScore: 46,
    },
    combo: {
      title: 'Combinada conservadora',
      confidence: ConfidenceLevel.LOW,
      riskScore: 58,
      stake: 20,
      totalOdd: 2.05,
    },
  },
  {
    externalId: 'seed-match-bra-usa',
    home: { externalId: 'seed-team-bra', name: 'Brasil', country: 'BR' },
    away: { externalId: 'seed-team-usa', name: 'Estados Unidos', country: 'US' },
    kickoffAt: kickoffToday(23, 0),
    stageLabel: 'Grupo B',
    odds: { home: 1.95, draw: 3.5, away: 4.1 },
    extras: {
      modelProbabilities: { home: 41.5, draw: 27.8, away: 30.7 },
      expectedGoals: { home: 1.58, away: 1.21 },
      favoriteSide: 'home',
    },
    analysis: {
      confidence: ConfidenceLevel.LOW,
      riskScore: 66,
      summary: 'Hay senales mixtas. La opcion prudente evita ganador directo.',
      reasonToBet: 'Brasil mantiene mejor generacion ofensiva, pero el precio del ganador puede no compensar.',
      reasonToAvoid: 'El visitante puede competir fisicamente y reducir espacios.',
    },
    mainPick: {
      market: PickMarket.BTTS,
      selection: 'Ambos marcan: No',
      odd: 1.9,
      valueScore: 52,
      stake: 25,
    },
  },
  {
    externalId: 'seed-match-fra-jpn',
    home: { externalId: 'seed-team-fra', name: 'Francia', country: 'FR' },
    away: { externalId: 'seed-team-jpn', name: 'Japon', country: 'JP' },
    kickoffAt: kickoffToday(15, 30),
    stageLabel: 'Grupo D',
    odds: { home: 1.72, draw: 3.8, away: 5.2 },
    extras: {
      modelProbabilities: { home: 37.3, draw: 27.8, away: 34.9 },
      expectedGoals: { home: 1.36, away: 1.31 },
      favoriteSide: 'home',
    },
    analysis: {
      confidence: ConfidenceLevel.HIGH,
      riskScore: 34,
      summary: 'Oportunidad detectada por IA en mercado conservador.',
      reasonToBet: 'Francia controla fases y genera volumen desde bandas.',
      reasonToAvoid: 'Japon puede cerrar espacios y alargar el partido.',
    },
    mainPick: {
      market: PickMarket.DOUBLE_CHANCE,
      selection: 'Francia o empate',
      odd: 1.28,
      valueScore: 68,
      stake: 50,
    },
  },
  {
    externalId: 'seed-match-esp-mar',
    home: { externalId: 'seed-team-esp', name: 'Espana', country: 'ES' },
    away: { externalId: 'seed-team-mar', name: 'Marruecos', country: 'MA' },
    kickoffAt: kickoffToday(18, 0),
    stageLabel: 'Grupo F',
    odds: { home: 2.2, draw: 3.2, away: 3.4 },
    extras: {
      modelProbabilities: { home: 33.1, draw: 31.2, away: 35.7 },
      expectedGoals: { home: 1.18, away: 1.25 },
      favoriteSide: 'away',
    },
    analysis: {
      confidence: ConfidenceLevel.NO_BET,
      riskScore: 78,
      summary: 'Partido con senales contradictorias. La IA recomienda no apostar.',
      reasonToBet: null,
      reasonToAvoid: 'Mercado equilibrado sin edge claro.',
    },
    mainPick: null,
  },
  {
    externalId: 'seed-match-col-per',
    home: { externalId: 'seed-team-col', name: 'Colombia', country: 'CO' },
    away: { externalId: 'seed-team-per', name: 'Peru', country: 'PE' },
    kickoffAt: kickoffToday(22, 0),
    stageLabel: 'Amistoso',
    odds: { home: 1.65, draw: 3.9, away: 5.5 },
    extras: {
      modelProbabilities: { home: 44.8, draw: 28.5, away: 26.7 },
      expectedGoals: { home: 1.45, away: 0.92 },
      favoriteSide: 'home',
    },
    analysis: {
      confidence: ConfidenceLevel.MEDIUM,
      riskScore: 51,
      summary: 'Local favorito con mejor rendimiento reciente.',
      reasonToBet: 'Colombia llega con mejor dinamica ofensiva.',
      reasonToAvoid: 'Partido amistoso con rotaciones posibles.',
    },
    mainPick: {
      market: PickMarket.MATCH_WINNER,
      selection: 'Colombia',
      odd: 1.65,
      valueScore: 58,
      stake: 40,
    },
  },
]

async function upsertTeam(team: { externalId: string; name: string; country: string }) {
  return prisma.team.upsert({
    where: { externalId: team.externalId },
    update: { name: team.name, country: team.country },
    create: team,
  })
}

async function seedPlansAndDevUser() {
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

  const passwordHash = await bcrypt.hash(DEV_USER.password, 10)

  await prisma.user.upsert({
    where: { email: DEV_USER.email },
    update: {},
    create: {
      email: DEV_USER.email,
      passwordHash,
      name: DEV_USER.name,
      profile: { create: {} },
      subscriptions: {
        create: {
          plan: { connect: { code: 'FREE' } },
        },
      },
    },
  })

  const devUser = await prisma.user.findUnique({ where: { email: DEV_USER.email } })
  if (devUser) {
    await prisma.userPredictionView.deleteMany({ where: { userId: devUser.id } })
  }

  console.log(`Dev user: ${DEV_USER.email} / ${DEV_USER.password}`)

  const adminPasswordHash = await bcrypt.hash(ADMIN_USER.password, 10)

  await prisma.user.upsert({
    where: { email: ADMIN_USER.email },
    update: { role: 'ADMIN' },
    create: {
      email: ADMIN_USER.email,
      passwordHash: adminPasswordHash,
      name: ADMIN_USER.name,
      role: 'ADMIN',
      profile: { create: {} },
      subscriptions: {
        create: {
          plan: { connect: { code: 'PREMIUM' } },
        },
      },
    },
  })

  console.log(`Admin user: ${ADMIN_USER.email} / ${ADMIN_USER.password}`)
}

async function clearSeedMatches(externalIdPrefix: string) {
  const matches = await prisma.match.findMany({
    where: { externalId: { startsWith: externalIdPrefix } },
    include: { picks: { select: { id: true } } },
  })

  const pickIds = matches.flatMap(match => match.picks.map(pick => pick.id))
  const matchIds = matches.map(match => match.id)

  if (!matchIds.length) return

  if (pickIds.length) {
    await prisma.userBetTracking.deleteMany({ where: { pickId: { in: pickIds } } })
    await prisma.comboBetLeg.deleteMany({ where: { pickId: { in: pickIds } } })
  }

  await prisma.match.deleteMany({ where: { id: { in: matchIds } } })
}

async function seedTodayFixtures() {
  await clearSeedMatches('seed-match-')

  const competition = await prisma.competition.upsert({
    where: { externalId: 'world-cup-2026' },
    update: { name: 'Mundial 2026', country: 'USA', type: 'international' },
    create: {
      externalId: 'world-cup-2026',
      name: 'Mundial 2026',
      country: 'USA',
      type: 'international',
    },
  })

  for (const fixture of seedFixtures) {
    const homeTeam = await upsertTeam(fixture.home)
    const awayTeam = await upsertTeam(fixture.away)

    const match = await prisma.match.create({
      data: {
        externalId: fixture.externalId,
        competitionId: competition.id,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        kickoffAt: fixture.kickoffAt,
        status: 'SCHEDULED',
        venue: 'Estadio seed',
        odds: {
          create: [
            { market: '1X2', selection: 'HOME', odd: fixture.odds.home, provider: 'seed' },
            { market: '1X2', selection: 'DRAW', odd: fixture.odds.draw, provider: 'seed' },
            { market: '1X2', selection: 'AWAY', odd: fixture.odds.away, provider: 'seed' },
          ],
        },
      },
    })

    const analysis = await prisma.aiAnalysis.create({
      data: {
        matchId: match.id,
        model: 'mock-v1',
        promptVersion: 'seed-1',
        status: AnalysisStatus.COMPLETED,
        confidence: fixture.analysis.confidence,
        riskScore: fixture.analysis.riskScore,
        summary: fixture.analysis.summary,
        reasonToBet: fixture.analysis.reasonToBet,
        reasonToAvoid: fixture.analysis.reasonToAvoid,
        rawOutputJson: {
          ...fixture.extras,
          stageLabel: fixture.stageLabel,
          dataQuality: 'sufficient',
        },
      },
    })

    const createdPicks: Pick[] = []

    if (fixture.mainPick) {
      const main = await prisma.pick.create({
        data: {
          analysisId: analysis.id,
          matchId: match.id,
          market: fixture.mainPick.market,
          selection: fixture.mainPick.selection,
          pickType: PickType.MAIN,
          confidence: fixture.analysis.confidence,
          riskScore: fixture.analysis.riskScore,
          valueScore: fixture.mainPick.valueScore,
          suggestedStakePercent: fixture.mainPick.stake,
          odd: fixture.mainPick.odd,
          rationale: fixture.analysis.reasonToBet,
        },
      })
      createdPicks.push(main)
    }

    if (fixture.altPick) {
      const alt = await prisma.pick.create({
        data: {
          analysisId: analysis.id,
          matchId: match.id,
          market: fixture.altPick.market,
          selection: fixture.altPick.selection,
          pickType: PickType.ALTERNATIVE,
          confidence: fixture.altPick.confidence,
          riskScore: fixture.altPick.riskScore,
          valueScore: fixture.altPick.valueScore,
          suggestedStakePercent: fixture.altPick.stake,
          odd: fixture.altPick.odd,
        },
      })
      createdPicks.push(alt)
    }

    if (fixture.combo && createdPicks.length >= 2) {
      await prisma.comboBet.create({
        data: {
          analysisId: analysis.id,
          title: fixture.combo.title,
          confidence: fixture.combo.confidence,
          riskScore: fixture.combo.riskScore,
          suggestedStakePercent: fixture.combo.stake,
          totalOdd: fixture.combo.totalOdd,
          legs: {
            create: createdPicks.slice(0, 2).map((pick, index) => ({
              pickId: pick.id,
              order: index + 1,
            })),
          },
        },
      })
    }
  }

  console.log(`Seeded ${seedFixtures.length} matches with predictions for today`)
}

const kickoffDaysAgo = (days: number, hours = 18) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(hours, 0, 0, 0)
  return date
}

const historyFixtures = [
  {
    externalId: 'seed-history-por-uru',
    home: { externalId: 'seed-team-por', name: 'Portugal', country: 'PT' },
    away: { externalId: 'seed-team-uru', name: 'Uruguay', country: 'UY' },
    kickoffAt: kickoffDaysAgo(5),
    resultStatus: PickResultStatus.WON,
    pick: {
      market: PickMarket.OVER_UNDER_GOALS,
      selection: 'Over 1.5 goles',
      odd: 1.62,
      stake: 40,
      confidence: ConfidenceLevel.MEDIUM,
    },
  },
  {
    externalId: 'seed-history-eng-sen',
    home: { externalId: 'seed-team-eng', name: 'Inglaterra', country: 'GB' },
    away: { externalId: 'seed-team-sen', name: 'Senegal', country: 'SN' },
    kickoffAt: kickoffDaysAgo(4),
    resultStatus: PickResultStatus.WON,
    pick: {
      market: PickMarket.DOUBLE_CHANCE,
      selection: 'Inglaterra o empate',
      odd: 1.32,
      stake: 55,
      confidence: ConfidenceLevel.HIGH,
    },
  },
  {
    externalId: 'seed-history-ita-chi',
    home: { externalId: 'seed-team-ita', name: 'Italia', country: 'IT' },
    away: { externalId: 'seed-team-chi', name: 'Chile', country: 'CL' },
    kickoffAt: kickoffDaysAgo(3),
    resultStatus: PickResultStatus.LOST,
    pick: {
      market: PickMarket.BTTS,
      selection: 'Ambos marcan: Si',
      odd: 1.95,
      stake: 20,
      confidence: ConfidenceLevel.LOW,
    },
  },
]

async function seedHistoryFixtures() {
  await clearSeedMatches('seed-history-')

  const competition = await prisma.competition.findFirst({
    where: { externalId: 'world-cup-2026' },
  })

  if (!competition) return

  for (const fixture of historyFixtures) {
    const homeTeam = await upsertTeam(fixture.home)
    const awayTeam = await upsertTeam(fixture.away)

    const match = await prisma.match.create({
      data: {
        externalId: fixture.externalId,
        competitionId: competition.id,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        kickoffAt: fixture.kickoffAt,
        status: 'FINISHED',
        venue: 'Estadio seed',
        homeScore: 2,
        awayScore: 1,
      },
    })

    const analysis = await prisma.aiAnalysis.create({
      data: {
        matchId: match.id,
        model: 'mock-v1',
        promptVersion: 'seed-history',
        status: AnalysisStatus.COMPLETED,
        confidence: fixture.pick.confidence,
        riskScore: 45,
        summary: 'Pick historico de demostracion.',
      },
    })

    await prisma.pick.create({
      data: {
        analysisId: analysis.id,
        matchId: match.id,
        market: fixture.pick.market,
        selection: fixture.pick.selection,
        pickType: PickType.MAIN,
        confidence: fixture.pick.confidence,
        suggestedStakePercent: fixture.pick.stake,
        odd: fixture.pick.odd,
        resultStatus: fixture.resultStatus,
      },
    })
  }

  console.log(`Seeded ${historyFixtures.length} historical picks`)
}

async function seedDevBankroll() {
  const devUser = await prisma.user.findUnique({ where: { email: DEV_USER.email } })
  if (!devUser) return

  await prisma.userBankroll.upsert({
    where: { userId: devUser.id },
    update: {
      initialAmount: 1000,
      currentAmount: 1048,
      currency: 'USD',
    },
    create: {
      userId: devUser.id,
      initialAmount: 1000,
      currentAmount: 1048,
      currency: 'USD',
    },
  })

  const historyPicks = await prisma.pick.findMany({
    where: {
      match: { externalId: { startsWith: 'seed-history-' } },
      pickType: PickType.MAIN,
    },
  })

  await prisma.userBetTracking.deleteMany({ where: { userId: devUser.id } })

  for (const pick of historyPicks) {
    const stakeAmount = 10
    const profitLoss =
      pick.resultStatus === PickResultStatus.WON
        ? stakeAmount * (Number(pick.odd) - 1)
        : pick.resultStatus === PickResultStatus.LOST
          ? -stakeAmount
          : 0

    await prisma.userBetTracking.create({
      data: {
        userId: devUser.id,
        pickId: pick.id,
        stakeAmount,
        oddTaken: pick.odd,
        status: pick.resultStatus,
        profitLoss,
      },
    })
  }

  console.log('Seeded dev bankroll and bet trackings')
}

async function main() {
  await seedPlansAndDevUser()
  await seedTodayFixtures()
  await seedHistoryFixtures()
  await seedDevBankroll()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
