'use client'

import { useState } from 'react'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { createAdminMatch } from '@/services/adminService'

const toIsoKickoff = () => {
  const date = new Date()
  date.setHours(date.getHours() + 3, 0, 0, 0)
  return date.toISOString().slice(0, 16)
}

const CreateMatchForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    competitionName: 'Mundial 2026',
    competitionExternalId: 'world-cup-2026',
    homeTeamName: '',
    homeTeamCountry: '',
    awayTeamName: '',
    awayTeamCountry: '',
    kickoffAt: toIsoKickoff(),
    venue: '',
    oddHome: '',
    oddDraw: '',
    oddAway: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const payload = {
        competitionName: form.competitionName,
        competitionExternalId: form.competitionExternalId,
        homeTeam: {
          name: form.homeTeamName,
          country: form.homeTeamCountry || undefined
        },
        awayTeam: {
          name: form.awayTeamName,
          country: form.awayTeamCountry || undefined
        },
        kickoffAt: new Date(form.kickoffAt).toISOString(),
        venue: form.venue || undefined
      }

      if (form.oddHome && form.oddDraw && form.oddAway) {
        payload.odds = {
          home: Number(form.oddHome),
          draw: Number(form.oddDraw),
          away: Number(form.oddAway)
        }
      }

      const match = await createAdminMatch(payload)
      setSuccess(`Partido creado: ${match.homeTeam} vs ${match.awayTeam} (id ${match.id})`)
      onCreated?.(match)
    } catch {
      setError('No se pudo crear el partido. Revisa los datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <Typography variant='h6'>Crear partido manual</Typography>
        <Typography variant='body2' color='text.secondary'>
          Usa esto solo para pruebas. En produccion los partidos vienen del proveedor deportivo.
        </Typography>
        <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
          <TextField label='Torneo' value={form.competitionName} onChange={e => update('competitionName', e.target.value)} required fullWidth />
          <TextField label='Slug torneo' value={form.competitionExternalId} onChange={e => update('competitionExternalId', e.target.value)} required fullWidth />
          <TextField label='Local' value={form.homeTeamName} onChange={e => update('homeTeamName', e.target.value)} required fullWidth />
          <TextField label='Pais local (AR)' value={form.homeTeamCountry} onChange={e => update('homeTeamCountry', e.target.value)} fullWidth />
          <TextField label='Visitante' value={form.awayTeamName} onChange={e => update('awayTeamName', e.target.value)} required fullWidth />
          <TextField label='Pais visitante (BR)' value={form.awayTeamCountry} onChange={e => update('awayTeamCountry', e.target.value)} fullWidth />
          <TextField label='Fecha y hora' type='datetime-local' value={form.kickoffAt} onChange={e => update('kickoffAt', e.target.value)} required fullWidth />
          <TextField label='Estadio' value={form.venue} onChange={e => update('venue', e.target.value)} fullWidth />
          <TextField label='Cuota local' type='number' value={form.oddHome} onChange={e => update('oddHome', e.target.value)} fullWidth />
          <TextField label='Cuota empate' type='number' value={form.oddDraw} onChange={e => update('oddDraw', e.target.value)} fullWidth />
          <TextField label='Cuota visitante' type='number' value={form.oddAway} onChange={e => update('oddAway', e.target.value)} fullWidth />
          <div className='md:col-span-2'>
            {error ? <Alert severity='error'>{error}</Alert> : null}
            {success ? <Alert severity='success'>{success}</Alert> : null}
          </div>
          <div className='md:col-span-2'>
            <Button type='submit' variant='contained' disabled={loading}>
              {loading ? 'Guardando...' : 'Crear partido'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateMatchForm
