import { apiClient } from '@/lib/apiClient'

export const getSportsDataStatus = () => apiClient('/admin/sports-data/status')

export const syncCompetition = (payload = {}) =>
  apiClient('/admin/sync/competition', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

export const syncLiveScores = (payload = {}) =>
  apiClient('/admin/sync/live-scores', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

export const createAdminMatch = payload =>
  apiClient('/admin/matches', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

export const publishAdminPrediction = (matchId, payload) =>
  apiClient(`/admin/matches/${matchId}/predictions`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
