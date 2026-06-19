'use client'

import { useCallback, useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import CountryFlag from '@/components/shared/CountryFlag'
import HelpInfoTooltip from '@/components/shared/HelpInfoTooltip'
import RemixIcon from '@/components/shared/RemixIcon'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import { resolveCountryCode } from '@/lib/country/resolveCountryCode'
import { formatExpectedGoals, formatKickoffRelative, formatMatchDayTime } from '@/lib/predictionFormatters'
import { predictionsHelp } from '@/lib/ui/predictionsHelp'
import MatchOutcomeBar from './MatchOutcomeBar'

const statusLabels = {
  SCHEDULED: 'Próximo',
  LIVE: 'Live',
  FINISHED: 'Fin'
}

const FAVORITES_STORAGE_KEY = 'prediction-favorites'

const readFavoriteIds = () => {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)

    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const writeFavoriteIds = ids => {
  if (typeof window === 'undefined') return

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids))
}

const UpcomingPredictionCard = ({ prediction }) => {
  const compact = useCompactDensity()
  const [isFavorite, setIsFavorite] = useState(false)
  const { day, time } = formatMatchDayTime(prediction.kickoffAt)
  const homeCode = resolveCountryCode(prediction.homeTeam, prediction.homeCountryCode)
  const awayCode = resolveCountryCode(prediction.awayTeam, prediction.awayCountryCode)
  const probs = prediction.modelProbabilities
  const xg = prediction.expectedGoals
  const showModel = !prediction.isLocked && probs
  const flagSize = compact ? 56 : 64

  useEffect(() => {
    setIsFavorite(readFavoriteIds().includes(prediction.id))
  }, [prediction.id])

  const toggleFavorite = useCallback(
    event => {
      event.stopPropagation()
      setIsFavorite(prev => {
        const next = !prev
        const ids = new Set(readFavoriteIds())

        if (next) ids.add(prediction.id)
        else ids.delete(prediction.id)
        writeFavoriteIds([...ids])

        return next
      })
    },
    [prediction.id]
  )

  return (
    <Card className='upcoming-prediction-card'>
      <CardContent className={classnames('upcoming-prediction-card__content match-of-day-body')}>
        <div className='match-of-day-watermark' aria-hidden />

        <div className='p-4 flex flex-col gap-3'>
          <div className='upcoming-prediction-card__toolbar relative z-[1] flex items-start justify-between gap-2'>
            <div className='flex flex-wrap items-center gap-2 min-is-0'>
              <Chip
                size='small'
                variant='tonal'
                color={prediction.status === 'LIVE' ? 'error' : 'warning'}
                label={statusLabels[prediction.status] || prediction.status}
              />
              {prediction.stageLabel ? (
                <Chip
                  size='small'
                  variant='outlined'
                  label={prediction.stageLabel}
                  className='upcoming-prediction-card__stage'
                />
              ) : null}
            </div>

            <div className='upcoming-prediction-card__actions flex items-center gap-0 shrink-0'>
              {xg ? <HelpInfoTooltip title={predictionsHelp.xg} iconClassName='ri-question-line' /> : null}
              {prediction.dataQuality === 'sufficient' ? (
                <HelpInfoTooltip title={predictionsHelp.dataQuality} iconClassName='ri-shield-check-line' />
              ) : null}
              {showModel ? (
                <HelpInfoTooltip title={predictionsHelp.outcomeBar} iconClassName='ri-question-line' />
              ) : (
                <HelpInfoTooltip title={predictionsHelp.premiumLock} iconClassName='ri-lock-line' />
              )}
              <Tooltip title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'} arrow placement='top'>
                <IconButton
                  size='small'
                  onClick={toggleFavorite}
                  aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                  aria-pressed={isFavorite}
                  className={classnames('upcoming-prediction-card__favorite-btn', {
                    'is-active': isFavorite
                  })}
                >
                  <RemixIcon icon={isFavorite ? 'ri-star-fill' : 'ri-star-line'} size='md' />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className='match-of-day-title'>
            <Typography              variant={compact ? 'subtitle1' : 'h6'}
              className='match-of-day-match-title block text-center font-bold'
            >
              {prediction.homeTeam} - {prediction.awayTeam}
            </Typography>
          </div>

          <div className='match-of-day-faceoff'>
            <div className='flex min-is-0 flex-col items-center gap-1'>
              <CountryFlag
                code={homeCode}
                size={flagSize}
                variant='sphere'
                className='upcoming-prediction-card__flag'
              />
              <Typography variant='caption' color='primary' className='font-semibold leading-none'>
                {prediction.homeCountryCode || 'LOC'}
              </Typography>
            </div>
            <div className='match-of-day-time'>              <Typography variant='h6' className='font-bold tabular-nums leading-none'>
                {time}
              </Typography>
              <Typography variant='caption' color='text.secondary' className='tabular-nums'>
                {day} · {formatKickoffRelative(prediction.kickoffAt)}
              </Typography>
              {xg ? (
                <Typography variant='caption' color='text.secondary' className='tabular-nums'>
                  xG {formatExpectedGoals(xg.home)}–{formatExpectedGoals(xg.away)}
                </Typography>
              ) : null}
            </div>
            <div className='flex min-is-0 flex-col items-center gap-1'>
              <CountryFlag
                code={awayCode}
                size={flagSize}
                variant='sphere'
                className='upcoming-prediction-card__flag'
              />
              <Typography variant='caption' color='info' className='font-semibold leading-none'>
                {prediction.awayCountryCode || 'VIS'}
              </Typography>
            </div>
          </div>          <div className='upcoming-prediction-card__outcome mt-2'>
            {showModel ? (              <MatchOutcomeBar probabilities={probs} />
            ) : (              <div className='upcoming-prediction-card__locked flex items-center justify-center gap-1 rounded-md border border-dashed px-3 py-2.5'>
                <RemixIcon icon='ri-lock-line' size='sm' className='text-textSecondary' />
                <Typography variant='body2' color='text.secondary' className='font-medium'>
                  Premium
                </Typography>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UpcomingPredictionCard
