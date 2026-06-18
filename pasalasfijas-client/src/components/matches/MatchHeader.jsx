'use client'

import Typography from '@mui/material/Typography'

import CountryFlag from '@/components/shared/CountryFlag'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import { resolveCountryCode } from '@/lib/country/resolveCountryCode'
import { formatKickoff } from '@/lib/predictionFormatters'

const TeamLine = ({ name, code, compact }) => (
  <span className='inline-flex items-center gap-1.5 min-w-0'>
    <CountryFlag code={code} size={compact ? 22 : 26} />
    <span className='truncate'>{name}</span>
  </span>
)

const MatchHeader = ({
  homeTeam,
  awayTeam,
  homeCountryCode,
  awayCountryCode,
  competition,
  kickoffAt,
  titleVariant = 'h5'
}) => {
  const compact = useCompactDensity()
  const homeCode = resolveCountryCode(homeTeam, homeCountryCode)
  const awayCode = resolveCountryCode(awayTeam, awayCountryCode)

  return (
    <div className='flex flex-col gap-0.5 min-is-0'>
      <Typography
        variant={compact ? 'subtitle1' : titleVariant}
        component='div'
        className='font-medium leading-snug'
      >
        <span className='inline-flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0'>
          <TeamLine name={homeTeam} code={homeCode} compact={compact} />
          <span className='text-textSecondary font-normal'>vs</span>
          <TeamLine name={awayTeam} code={awayCode} compact={compact} />
        </span>
      </Typography>
      <div className='flex flex-wrap items-center gap-x-2 gap-y-0.5'>
        <Typography variant='caption' color='text.secondary'>
          {competition}
        </Typography>
        <span className='hidden sm:inline text-textDisabled'>·</span>
        <span className='inline-flex items-center gap-1'>
          <i
            className='ri-time-line shrink-0 text-textDisabled leading-none !size-[18px]'
            aria-hidden
          />
          <Typography variant='caption' color='text.secondary' component='span'>
            {formatKickoff(kickoffAt)}
          </Typography>
        </span>
      </div>
    </div>
  )
}

export default MatchHeader
