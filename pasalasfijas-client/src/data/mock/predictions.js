export const mockTodayPredictions = {
  freeUnlocksUsed: 1,
  freeUnlocksLimit: 2,
  items: [
    {
      id: 'match-arg-mex',
      homeTeam: 'Argentina',
      homeCountryCode: 'AR',
      awayTeam: 'Mexico',
      awayCountryCode: 'MX',
      competition: 'Mundial 2026',
      competitionSlug: 'world-cup-2026',
      kickoffAt: '2026-06-16T20:00:00.000Z',
      odds: { home: 2.05, draw: 3.4, away: 3.75 },
      status: 'SCHEDULED',
      stageLabel: 'Grupo A',
      modelProbabilities: { home: 48.2, draw: 26.4, away: 25.4 },
      expectedGoals: { home: 1.74, away: 1.12 },
      favoriteSide: 'home',
      dataQuality: 'sufficient',
      isLocked: false,
      analysis: {
        confidence: 'MEDIUM',
        riskScore: 42,
        summary: 'Escenario favorable a mercado de goles moderado, sin forzar ganador.',
        reasonToBet: 'Ambos equipos tienen volumen ofensivo suficiente para sostener una línea baja de goles.',
        reasonToAvoid: 'El ritmo puede bajar si el partido se vuelve táctico.',
        mainPick: {
          market: 'OVER_UNDER_GOALS',
          selection: 'Over 1.5 goles',
          stakeIndex: 45,
          odd: 1.58,
          valueScore: 61
        },
        alternativePicks: [
          {
            market: 'DOUBLE_CHANCE',
            selection: 'Argentina o empate',
            confidence: 'MEDIUM',
            riskScore: 46,
            stakeIndex: 35,
            odd: 1.36
          }
        ],
        comboBet: {
          title: 'Combinada conservadora',
          confidence: 'LOW',
          riskScore: 58,
          stakeIndex: 20,
          totalOdd: 2.05,
          legs: ['Argentina o empate', 'Over 1.5 goles']
        }
      }
    },
    {
      id: 'match-bra-usa',
      homeTeam: 'Brasil',
      homeCountryCode: 'BR',
      awayTeam: 'Estados Unidos',
      awayCountryCode: 'US',
      competition: 'Mundial 2026',
      competitionSlug: 'world-cup-2026',
      kickoffAt: '2026-06-16T23:00:00.000Z',
      status: 'SCHEDULED',
      stageLabel: 'Grupo B',
      modelProbabilities: { home: 41.5, draw: 27.8, away: 30.7 },
      expectedGoals: { home: 1.58, away: 1.21 },
      favoriteSide: 'home',
      dataQuality: 'sufficient',
      isLocked: false,
      analysis: {
        confidence: 'LOW',
        riskScore: 66,
        summary: 'Hay señales mixtas. La opción prudente evita ganador directo.',
        reasonToBet: 'Brasil mantiene mejor generación ofensiva, pero el precio del ganador puede no compensar.',
        reasonToAvoid: 'El visitante puede competir físicamente y reducir espacios.',
        mainPick: {
          market: 'BTTS',
          selection: 'Ambos marcan: No',
          stakeIndex: 25,
          odd: 1.9,
          valueScore: 52
        },
        alternativePicks: [],
        comboBet: null
      }
    },
    {
      id: 'match-fra-jpn',
      homeTeam: 'Francia',
      homeCountryCode: 'FR',
      awayTeam: 'Japon',
      awayCountryCode: 'JP',
      competition: 'Mundial 2026',
      competitionSlug: 'world-cup-2026',
      kickoffAt: '2026-06-17T01:00:00.000Z',
      status: 'SCHEDULED',
      stageLabel: 'Grupo D',
      modelProbabilities: { home: 37.3, draw: 27.8, away: 34.9 },
      expectedGoals: { home: 1.362, away: 1.307 },
      favoriteSide: 'home',
      dataQuality: 'sufficient',
      isLocked: true,
      analysis: {
        confidence: 'HIGH',
        riskScore: 34,
        summary: 'Oportunidad detectada por IA en mercado conservador.',
        mainPick: {
          market: 'DOUBLE_CHANCE',
          selection: 'Bloqueado',
          stakeIndex: null,
          odd: null,
          valueScore: null
        }
      }
    },
    {
      id: 'match-esp-mar',
      homeTeam: 'España',
      homeCountryCode: 'ES',
      awayTeam: 'Marruecos',
      awayCountryCode: 'MA',
      competition: 'Mundial 2026',
      competitionSlug: 'world-cup-2026',
      kickoffAt: '2026-06-17T03:00:00.000Z',
      status: 'SCHEDULED',
      stageLabel: 'Grupo F',
      modelProbabilities: { home: 33.1, draw: 31.2, away: 35.7 },
      expectedGoals: { home: 1.18, away: 1.25 },
      favoriteSide: 'away',
      dataQuality: 'sufficient',
      isLocked: true,
      analysis: {
        confidence: 'NO_BET',
        riskScore: 78,
        summary: 'Partido con señales contradictorias. La IA puede recomendar no apostar.',
        mainPick: null
      }
    },
    {
      id: 'match-col-per',
      homeTeam: 'Colombia',
      homeCountryCode: 'CO',
      awayTeam: 'Peru',
      awayCountryCode: 'PE',
      competition: 'Amistoso internacional',
      competitionSlug: 'friendlies',
      kickoffAt: '2026-06-15T22:00:00.000Z',
      status: 'SCHEDULED',
      stageLabel: 'Amistoso',
      modelProbabilities: { home: 44.6, draw: 28.9, away: 26.5 },
      expectedGoals: { home: 1.45, away: 1.08 },
      favoriteSide: 'home',
      dataQuality: 'sufficient',
      isLocked: false,
      analysis: {
        confidence: 'MEDIUM',
        riskScore: 48,
        summary: 'Amistoso con ritmo abierto. Mercado de goles con valor moderado.',
        mainPick: {
          market: 'OVER_UNDER_GOALS',
          selection: 'Over 2.5 goles',
          stakeIndex: 38,
          odd: 1.92,
          valueScore: 55
        }
      }
    },
    {
      id: 'match-ger-ned',
      homeTeam: 'Alemania',
      homeCountryCode: 'DE',
      awayTeam: 'Paises Bajos',
      awayCountryCode: 'NL',
      competition: 'Amistoso internacional',
      competitionSlug: 'friendlies',
      kickoffAt: '2026-06-16T18:30:00.000Z',
      status: 'SCHEDULED',
      stageLabel: 'Amistoso',
      modelProbabilities: { home: 36.8, draw: 29.4, away: 33.8 },
      expectedGoals: { home: 1.52, away: 1.41 },
      favoriteSide: 'home',
      dataQuality: 'sufficient',
      isLocked: false,
      analysis: {
        confidence: 'LOW',
        riskScore: 62,
        summary: 'Selecciones de nivel alto. Ganador directo con precio ajustado.',
        mainPick: {
          market: 'DOUBLE_CHANCE',
          selection: 'Alemania o empate',
          stakeIndex: 30,
          odd: 1.44,
          valueScore: 49
        }
      }
    }
  ]
}

export const mockPredictionHistory = [
  {
    id: 'pick-1',
    match: 'Portugal vs Uruguay',
    market: 'OVER_UNDER_GOALS',
    selection: 'Over 1.5 goles',
    confidence: 'MEDIUM',
    stakeIndex: 40,
    odd: 1.62,
    resultStatus: 'WON',
    profitLoss: 0.62
  },
  {
    id: 'pick-2',
    match: 'Inglaterra vs Senegal',
    market: 'DOUBLE_CHANCE',
    selection: 'Inglaterra o empate',
    confidence: 'HIGH',
    stakeIndex: 55,
    odd: 1.32,
    resultStatus: 'WON',
    profitLoss: 0.32
  },
  {
    id: 'pick-3',
    match: 'Italia vs Chile',
    market: 'BTTS',
    selection: 'Ambos marcan: Si',
    confidence: 'LOW',
    stakeIndex: 20,
    odd: 1.95,
    resultStatus: 'LOST',
    profitLoss: -1
  }
]

export const mockBankroll = {
  currency: 'USD',
  initialAmount: 1000,
  currentAmount: 1048,
  roi: 4.8,
  winRate: 66.7,
  totalTrackedPicks: 3
}
