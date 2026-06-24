'use client'

import { useEffect, useState } from 'react'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { publishAdminPrediction } from '@/services/adminService'
import { getTodayMatches } from '@/services/matchesService'

const MARKETS = [
  { value: 'MATCH_WINNER', label: 'Ganador (1X2)' },
  { value: 'DOUBLE_CHANCE', label: 'Doble oportunidad' },
  { value: 'OVER_UNDER_GOALS', label: 'Over/Under goles' },
  { value: 'BTTS', label: 'Ambos marcan' }
]

const CONFIDENCE = [
  { value: 'HIGH', label: 'Alta' },
  { value: 'MEDIUM', label: 'Media' },
  { value: 'LOW', label: 'Baja' },
  { value: 'NO_BET', label: 'No apostar' }
]

const PublishPredictionForm = ({ refreshKey = 0 }) => {
  const [matches, setMatches] = useState([])
  const [form, setForm] = useState({
    matchId: '',
    confidence: 'MEDIUM',
    riskScore: 45,
    summary: '',
    reasonToBet: '',
    market: 'OVER_UNDER_GOALS',
    selection: '',
    odd: '',
    stake: 40
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    getTodayMatches()
      .then(data => setMatches(data.items ?? []))
      .catch(() => setMatches([]))
  }, [refreshKey])

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.matchId) {
      setError('Selecciona un partido.')
      return
    }

    setLoading(true)
    try {
      const result = await publishAdminPrediction(Number(form.matchId), {
        confidence: form.confidence,
        riskScore: Number(form.riskScore),
        summary: form.summary,
        reasonToBet: form.reasonToBet || undefined,
        mainPick: {
          market: form.market,
          selection: form.selection,
          odd: form.odd ? Number(form.odd) : undefined,
          stake: Number(form.stake)
        }
      })
      setSuccess(`Fija publicada (pick id ${result.pickId})`)
    } catch {
      setError('No se pudo publicar la prediccion.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <Typography variant='h6'>Publicar fija mock</Typography>
        <Typography variant='body2' color='text.secondary'>
          Crea el analisis y pick principal para un partido de hoy.
        </Typography>
        <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
          <TextField
            select
            label='Partido de hoy'
            value={form.matchId}
            onChange={e => update('matchId', e.target.value)}
            required
            fullWidth
            className='md:col-span-2'
          >
            {matches.map(match => (
              <MenuItem key={match.id} value={String(match.id)}>
                {match.homeTeam} vs {match.awayTeam} · {new Date(match.kickoffAt).toLocaleString('es-PE')}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label='Confianza' value={form.confidence} onChange={e => update('confidence', e.target.value)} fullWidth>
            {CONFIDENCE.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField label='Riesgo (0-100)' type='number' value={form.riskScore} onChange={e => update('riskScore', e.target.value)} fullWidth />
          <TextField label='Resumen' value={form.summary} onChange={e => update('summary', e.target.value)} required fullWidth className='md:col-span-2' />
          <TextField label='Motivo para apostar' value={form.reasonToBet} onChange={e => update('reasonToBet', e.target.value)} fullWidth className='md:col-span-2' />
          <TextField select label='Mercado' value={form.market} onChange={e => update('market', e.target.value)} fullWidth>
            {MARKETS.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField label='Seleccion' value={form.selection} onChange={e => update('selection', e.target.value)} required fullWidth />
          <TextField label='Cuota' type='number' value={form.odd} onChange={e => update('odd', e.target.value)} fullWidth />
          <TextField label='Stake index' type='number' value={form.stake} onChange={e => update('stake', e.target.value)} fullWidth />
          <div className='md:col-span-2'>
            {error ? <Alert severity='error'>{error}</Alert> : null}
            {success ? <Alert severity='success'>{success}</Alert> : null}
          </div>
          <div className='md:col-span-2'>
            <Button type='submit' variant='contained' disabled={loading || !matches.length}>
              {loading ? 'Publicando...' : 'Publicar fija'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default PublishPredictionForm
