'use client'

import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import MatchOfTheDay from '@/components/matches/MatchOfTheDay'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import PredictionCard from '@/components/predictions/PredictionCard'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import UpgradeBanner from '@/components/subscription/UpgradeBanner'
import { getTodayPredictions } from '@/services/predictionsService'

const DashboardView = () => {
  const compact = useCompactDensity()
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true

    getTodayPredictions().then(result => {
      if (active) setData(result)
    })

    return () => {
      active = false
    }
  }, [])

  if (!data) {
    return <DashboardPageLoading />
  }

  const unlocked = data.items.filter(item => !item.isLocked)
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
