'use client'

import { useMemo } from 'react'

import Typography from '@mui/material/Typography'

import { readFavoriteIds } from '@/lib/predictionFavorites'
import UpcomingPredictionCard from './UpcomingPredictionCard'

export const UPCOMING_PREDICTIONS_LIMIT = 30

export const sortPredictionsByKickoff = (items = []) =>
  [...items].sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime())

const UpcomingPredictionsFeed = ({ predictions = [], limit = UPCOMING_PREDICTIONS_LIMIT }) => {
  const favoriteIds = useMemo(() => new Set(readFavoriteIds()), [])
  const upcoming = sortPredictionsByKickoff(predictions)
    .filter(item => item.status !== 'FINISHED')
    .slice(0, limit)

  if (!upcoming.length) {
    return <Typography color='text.secondary'>No hay partidos programados por ahora.</Typography>
  }

  return (
    <div className='flex flex-col gap-4'>
      {upcoming.map(prediction => (
        <UpcomingPredictionCard key={prediction.id} prediction={prediction} favoriteIds={favoriteIds} />
      ))}
    </div>
  )
}

export default UpcomingPredictionsFeed
