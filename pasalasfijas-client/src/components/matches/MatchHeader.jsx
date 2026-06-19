'use client'

import Typography from '@mui/material/Typography'

import CountryFlag from '@/components/shared/CountryFlag'
import RemixIcon from '@/components/shared/RemixIcon'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import { resolveCountryCode } from '@/lib/country/resolveCountryCode'
import { formatKickoff } from '@/lib/predictionFormatters'

const TeamLine = ({ name, code, flagSize = 26 }) => (
  <span className='inline-flex items-center gap-2 min-w-0'>
    <CountryFlag code={code} size={flagSize} variant='sphere' />
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
  titleVariant = 'h5',
  flagSize
}) => {
  const compact = useCompactDensity()
  const resolvedFlagSize = flagSize ?? (compact ? 30 : 36)
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
          <TeamLine name={homeTeam} code={homeCode} flagSize={resolvedFlagSize} />
          <span className='text-textSecondary font-normal'>vs</span>
          <TeamLine name={awayTeam} code={awayCode} flagSize={resolvedFlagSize} />
        </span>
      </Typography>
      <div className='flex flex-wrap items-center gap-x-2 gap-y-0.5'>
        <Typography variant='caption' color='text.secondary'>
          {competition}
        </Typography>
        <span className='hidden sm:inline text-textDisabled'>·</span>
        <span className='inline-flex items-center gap-1'>
          <RemixIcon icon='ri-time-line' size='xs' className='shrink-0 text-textDisabled' />
          <Typography variant='caption' color='text.secondary' component='span'>
            {formatKickoff(kickoffAt)}
          </Typography>
        </span>
      </div>
    </div>
  )
}

export default MatchHeader
