'use client'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import MatchOfTheDay from '@/components/matches/MatchOfTheDay'
import PredictionCard from '@/components/predictions/PredictionCard'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import UpgradeBanner from '@/components/subscription/UpgradeBanner'

const DashboardView = ({ data }) => {
  const compact = useCompactDensity()
  const unlocked = data.items.filter(item => !item.isLocked)
  const lockedCount = data.items.length - unlocked.length
  const noBetCount = data.items.filter(item => item.analysis?.confidence === 'NO_BET').length
  const topPrediction = unlocked[0]

  return (
    <div className='page-stack flex flex-col gap-6'>
      <div className='page-stack-sm flex flex-col gap-2'>
        <Typography variant='h4'>Panel del día</Typography>
        <Typography color='text.secondary' variant={compact ? 'body2' : 'body1'}>
          Resumen diario de fijas con lectura conservadora, control de riesgo y opción NO BET.
        </Typography>
      </div>

      <UpgradeBanner used={data.freeUnlocksUsed} limit={data.freeUnlocksLimit} />

      {topPrediction ? (
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <Typography variant='h5'>Partido del dia</Typography>
            <Button href='/matches' variant='tonal' color='primary'>
              Ver calendario
            </Button>
          </div>
          <MatchOfTheDay match={topPrediction} />
        </div>
      ) : null}

      <Grid container spacing={compact ? 3 : 4}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HorizontalWithSubtitle
            title='Partidos del dia'
            stats={String(data.items.length)}
            avatarIcon='ri-football-line'
            avatarColor='primary'
            subtitle='Publicados para hoy'
            avatarSize={compact ? 36 : 42}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HorizontalWithSubtitle
            title='Desbloqueados'
            stats={String(unlocked.length)}
            avatarIcon='ri-lock-unlock-line'
            avatarColor='success'
            subtitle='Visibles en plan gratuito'
            avatarSize={compact ? 36 : 42}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HorizontalWithSubtitle
            title='Bloqueados'
            stats={String(lockedCount)}
            avatarIcon='ri-lock-line'
            avatarColor='warning'
            subtitle='Requieren Premium'
            avatarSize={compact ? 36 : 42}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HorizontalWithSubtitle
            title='NO BET'
            stats={String(noBetCount)}
            avatarIcon='ri-forbid-line'
            avatarColor='error'
            subtitle='Sin valor claro hoy'
            avatarSize={compact ? 36 : 42}
          />
        </Grid>
      </Grid>

      {topPrediction ? (
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <Typography variant='h5'>Prediccion destacada</Typography>
            <Button href='/predictions' variant='tonal' color='primary'>
              Ver todas
            </Button>
          </div>
          <PredictionCard prediction={topPrediction} showCombo={false} />
        </div>
      ) : null}
    </div>
  )
}

export default DashboardView
