'use client'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import MatchOfTheDay from '@/components/matches/MatchOfTheDay'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import PredictionCard from '@/components/predictions/PredictionCard'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import UpgradeBanner from '@/components/subscription/UpgradeBanner'
import { useCachedQuery } from '@/hooks/useCachedQuery'
import { queryKeys } from '@/lib/query/queryKeys'
import { getTodayPredictions } from '@/services/predictionsService'

const DashboardView = () => {
  const compact = useCompactDensity()
  const { data, isLoading } = useCachedQuery(queryKeys.predictions.today, getTodayPredictions)

  if (isLoading) {
    return <DashboardPageLoading />
  }

  const unlocked = data.items.filter(item => !item.isLocked)
  const topPrediction = unlocked[0]

  return (
    <div className='page-stack flex flex-col gap-6'>
      <div className='page-stack-sm flex flex-col gap-1'>
        <Typography variant='h4'>Panel del día</Typography>
        <Typography color='text.secondary' variant='body2'>
          Fijas de hoy · lectura conservadora
        </Typography>
      </div>

      <UpgradeBanner used={data.freeUnlocksUsed} limit={data.freeUnlocksLimit} compact={compact} />

      {topPrediction ? (
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <Typography variant='h5'>Partido del día</Typography>
            <Button href='/matches' variant='tonal' color='primary'>
              Ver calendario
            </Button>
          </div>
          <MatchOfTheDay match={topPrediction} />
        </div>
      ) : null}

      {topPrediction ? (
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <Typography variant='h5'>Fija destacada</Typography>
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
