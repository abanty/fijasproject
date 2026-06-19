'use client'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import classnames from 'classnames'

import Link from '@components/Link'
import CountryFlag from '@/components/shared/CountryFlag'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import { resolveCountryCode } from '@/lib/country/resolveCountryCode'
import { formatMatchDayTime, formatOdd } from '@/lib/predictionFormatters'

const OddsCell = ({ label, value, href, onClick }) => (
  <Button
    component={href ? Link : 'button'}
    href={href}
    type={href ? undefined : 'button'}
    onClick={onClick}
    disabled={value == null}
    variant='tonal'
    color='secondary'
    size='small'
    fullWidth
    className='match-of-day-odds-btn'
  >
    <span className='flex w-full min-w-0 items-center justify-between gap-2'>
      <Typography component='span' variant='caption' color='text.secondary' className='font-medium leading-none'>
        {label}
      </Typography>
      <Typography component='span' variant='body2' className='font-semibold tabular-nums leading-none'>
        {value != null ? formatOdd(value) : '—'}
      </Typography>
    </span>
  </Button>
)

const MatchOfTheDay = ({ match, showPredictionLink = true }) => {
  const compact = useCompactDensity()

  if (!match) return null

  const homeCode = resolveCountryCode(match.homeTeam, match.homeCountryCode)
  const awayCode = resolveCountryCode(match.awayTeam, match.awayCountryCode)
  const { day, time } = formatMatchDayTime(match.kickoffAt)
  const odds = match.odds || {}
  const hasOdds = odds.home != null || odds.draw != null || odds.away != null
  const flagSize = compact ? 54 : 64

  return (
    <Card className='match-of-day'>
      <CardContent className={classnames('match-of-day-body', compact && 'match-of-day-body--compact')}>
        <div className='match-of-day-watermark' aria-hidden />

        <div className='flex flex-col gap-3 p-4'>
          <div className='match-of-day-badge'>
            <Chip
              size='small'
              color='secondary'
              className='match-of-day-badge-chip'
              icon={<i className='ri-football-line' />}
              label='Partido del dia'
              slotProps={{
                icon: {
                  className: 'match-of-day-badge-chip-icon',
                  sx: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 16,
                    width: 16,
                    marginInlineStart: '0.5rem',
                    marginInlineEnd: '-0.125rem',
                    fontSize: '13px',
                    '& i, & svg': {
                      fontSize: '13px',
                      lineHeight: 1
                    }
                  }
                }
              }}
              sx={{
                height: 24,
                fontSize: '0.8125rem',
                '& .MuiChip-label': {
                  paddingInline: '12px'
                }
              }}
            />
          </div>

          <div className='match-of-day-title relative z-[1]'>
            <Typography variant='caption' color='text.secondary' className='block text-center'>
              {match.competition}
            </Typography>
            <Typography
              variant={compact ? 'subtitle1' : 'h6'}
              className='match-of-day-match-title block text-center font-bold'
            >
              {match.homeTeam} - {match.awayTeam}
            </Typography>
          </div>

          <div className='match-of-day-faceoff relative z-[1]'>
            <div className='flex min-is-0 flex-col items-center gap-1'>
              <CountryFlag code={homeCode} size={flagSize} variant='sphere' className='mx-auto' />
              <Typography variant='caption' color='primary' className='font-semibold leading-none'>
                {match.homeCountryCode || 'LOC'}
              </Typography>
            </div>

            <div className='match-of-day-time'>
              <Typography variant='caption' color='text.secondary' className='font-medium leading-none'>
                {day}
              </Typography>
              <Typography variant={compact ? 'subtitle1' : 'h6'} className='font-bold tabular-nums leading-none'>
                {time}
              </Typography>
            </div>

            <div className='flex min-is-0 flex-col items-center gap-1'>
              <CountryFlag code={awayCode} size={flagSize} variant='sphere' className='mx-auto' />
              <Typography variant='caption' color='info' className='font-semibold leading-none'>
                {match.awayCountryCode || 'VIS'}
              </Typography>
            </div>
          </div>

          {hasOdds ? (
            <div className='match-of-day-odds relative z-[2]'>
              <OddsCell label='V1' value={odds.home} />
              <OddsCell label='X' value={odds.draw} />
              <OddsCell label='V2' value={odds.away} />
            </div>
          ) : null}

          {showPredictionLink ? (
            <div className='match-of-day-action relative z-[1]'>
              <Button component={Link} href='/predictions' variant='text' size='small' className='self-end'>
                Ver prediccion IA
              </Button>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default MatchOfTheDay
