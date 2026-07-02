export const queryKeys = {
  predictions: {
    today: 'predictions/today',
    history: 'predictions/history'
  },
  competitions: {
    matchCounts: 'competitions/match-counts',
    matches: slug => `competitions/matches/${slug}`
  },
  bankroll: {
    summary: 'bankroll/summary'
  }
}
