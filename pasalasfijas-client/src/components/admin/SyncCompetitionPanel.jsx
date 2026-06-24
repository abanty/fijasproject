'use client'

import { useEffect, useState } from 'react'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { getSportsDataStatus, syncCompetition, syncLiveScores } from '@/services/adminService'

const SYNC_PRESETS = [
  {
    id: 'wc-2026-openfootball',
    label: 'Mundial 2026 (Open Football — gratis)',
    provider: 'open-football',
    leagueId: 0,
    season: 2026,
    freePlan: true
  },
  {
    id: 'wc-2026',
    label: 'Mundial 2026 (API-Football — plan pago)',
    provider: 'api-football',
    leagueId: 1,
    season: 2026,
    freePlan: false
  },
  {
    id: 'wc-2022',
    label: 'Mundial 2022 (API-Football — plan gratis)',
    provider: 'api-football',
    leagueId: 1,
    season: 2022,
    freePlan: true
  },
  {
    id: 'premier-2024',
    label: 'Premier League 2024 (API-Football — plan gratis)',
    provider: 'api-football',
    leagueId: 39,
    season: 2024,
    freePlan: true
  }
]

const SyncCompetitionPanel = ({ onSynced }) => {
  const [fixtureProviders, setFixtureProviders] = useState([])
  const [liveScoreProviders, setLiveScoreProviders] = useState([])
  const [presetId, setPresetId] = useState('wc-2026-openfootball')
  const [loadingFixtures, setLoadingFixtures] = useState(false)
  const [loadingLive, setLoadingLive] = useState(false)
  const [fixtureResult, setFixtureResult] = useState(null)
  const [liveResult, setLiveResult] = useState(null)
  const [error, setError] = useState('')

  const preset = SYNC_PRESETS.find(item => item.id === presetId) ?? SYNC_PRESETS[0]
  const presetProvider = fixtureProviders.find(item => item.provider === preset.provider)

  useEffect(() => {
    getSportsDataStatus()
      .then(data => {
        setFixtureProviders(data.fixtureProviders ?? data.providers ?? [])
        setLiveScoreProviders(data.liveScoreProviders ?? [])
      })
      .catch(() => {
        setFixtureProviders([
          {
            configured: false,
            provider: 'api-football',
            message: 'No se pudo consultar el estado de los proveedores.'
          }
        ])
      })
  }, [])

  const handleSyncFixtures = async () => {
    setError('')
    setFixtureResult(null)
    setLoadingFixtures(true)
    try {
      const response = await syncCompetition({
        provider: preset.provider,
        leagueId: preset.leagueId,
        season: preset.season
      })
      setFixtureResult(response)
      if (response.ok) onSynced?.()
    } catch {
      setError('Error al sincronizar fixtures. Revisa el server o tu conexion.')
    } finally {
      setLoadingFixtures(false)
    }
  }

  const handleSyncLive = async () => {
    setError('')
    setLiveResult(null)
    setLoadingLive(true)
    try {
      const response = await syncLiveScores({
        provider: 'world-cup-26',
        competitionExternalId: 'world-cup-2026'
      })
      setLiveResult(response)
      if (response.ok) onSynced?.()
    } catch {
      setError('Error al sincronizar marcadores live.')
    } finally {
      setLoadingLive(false)
    }
  }

  const canSyncFixtures = presetProvider?.configured ?? preset.provider === 'open-football'
  const canSyncLive = liveScoreProviders.some(item => item.configured) || liveScoreProviders.length === 0

  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <Typography variant='h6'>Datos deportivos</Typography>
        <Typography variant='body2' color='text.secondary'>
          Fixtures desde Open Football o API-Football. Marcadores live desde WorldCup26 (backup). Primero
          sincroniza el calendario; luego actualiza resultados en vivo.
        </Typography>

        {fixtureProviders.map(item => (
          <Alert key={`fixture-${item.provider}`} severity={item.configured ? 'success' : 'warning'}>
            <strong>Fixture · {item.provider}:</strong> {item.message}
          </Alert>
        ))}

        {liveScoreProviders.map(item => (
          <Alert key={`live-${item.provider}`} severity={item.configured ? 'info' : 'warning'}>
            <strong>Live · {item.provider}:</strong> {item.message}
          </Alert>
        ))}

        <TextField
          select
          label='Torneo a sincronizar (fixtures)'
          value={presetId}
          onChange={event => setPresetId(event.target.value)}
          fullWidth
        >
          {SYNC_PRESETS.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        {preset.provider === 'api-football' && !preset.freePlan ? (
          <Alert severity='info'>
            Mundial 2026 via API-Football requiere plan de pago. Usa Open Football para el calendario gratis.
          </Alert>
        ) : null}

        {preset.provider === 'api-football' && preset.freePlan && !presetProvider?.configured ? (
          <Alert severity='warning'>Configura FOOTBALL_API_KEY en el server para usar API-Football.</Alert>
        ) : null}

        <Button variant='contained' onClick={handleSyncFixtures} disabled={loadingFixtures || !canSyncFixtures}>
          {loadingFixtures
            ? 'Sincronizando fixtures...'
            : `Sincronizar fixtures (${preset.provider}, season=${preset.season})`}
        </Button>

        {fixtureResult ? (
          <Alert severity={fixtureResult.ok ? 'success' : 'warning'}>
            {fixtureResult.message}
            {fixtureResult.ok
              ? ` Creados: ${fixtureResult.created}, actualizados: ${fixtureResult.updated}.`
              : ''}
          </Alert>
        ) : null}

        <Divider />

        <Typography variant='subtitle1'>Marcadores live (Mundial 2026)</Typography>
        <Typography variant='body2' color='text.secondary'>
          Actualiza status y goles de partidos ya cargados con externalId <code>world-cup-2026</code>.
        </Typography>

        <Button
          variant='outlined'
          onClick={handleSyncLive}
          disabled={loadingLive || !canSyncLive}
        >
          {loadingLive ? 'Actualizando live...' : 'Sincronizar marcadores live (world-cup-26)'}
        </Button>

        {liveResult ? (
          <Alert severity={liveResult.ok ? 'success' : 'warning'}>
            {liveResult.message}
            {liveResult.ok
              ? ` Emparejados: ${liveResult.matched}, actualizados: ${liveResult.updated}.`
              : ''}
          </Alert>
        ) : null}

        {error ? <Alert severity='error'>{error}</Alert> : null}
      </CardContent>
    </Card>
  )
}

export default SyncCompetitionPanel
