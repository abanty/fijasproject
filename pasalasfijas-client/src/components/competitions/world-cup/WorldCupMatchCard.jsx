'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import CountryFlag from '@/components/shared/CountryFlag'
import RemixIcon from '@components/shared/RemixIcon'
import { worldCupMatchCardBackground } from '@/data/competitions/worldCupHub'
import { resolveCountryCode } from '@/lib/country/resolveCountryCode'
import {
  formatMatchCardDateTime,
  formatMatchStatusLabel,
  shortenVenue
} from '@/lib/matches/matchScheduleFormat'

const TeamColumn = ({ name, countryCode }) => {
  const code = resolveCountryCode(name, countryCode)

  return (
    <Stack spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
      {code ? (
        <CountryFlag code={code} size={40} variant='sphere' />
      ) : (
        <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgb(255 255 255 / 0.12)' }} />
      )}
      <Typography
        variant='body2'
        fontWeight={700}
        align='center'
        className='world-cup-match-card__team'
        sx={{ lineHeight: 1.25, px: 0.5 }}
      >
        {name}
      </Typography>
    </Stack>
  )
}

const formatScore = (match) => {
  if (match.status === 'SCHEDULED' && match.homeScore == null && match.awayScore == null) {
    return '– –'
  }

  const home = match.homeScore ?? '–'
  const away = match.awayScore ?? '–'

  return `${home} - ${away}`
}

const WorldCupMatchCard = ({ match, backgroundImage = worldCupMatchCardBackground }) => {
  const hasBackground = Boolean(backgroundImage)
  const stageText = match.stageLabel || (match.matchNumber ? `Partido ${match.matchNumber}` : '')
  const venueText = shortenVenue(match.venue)
  const dateTimeText = formatMatchCardDateTime(match.kickoffAt)
  const statusText = formatMatchStatusLabel(match.status)

  return (
    <Card
      className={classnames('world-cup-match-card', {
        'world-cup-match-card--has-bg': hasBackground
      })}
      sx={{ height: '100%' }}
    >
      {hasBackground ? (
        <>
          <Box className='world-cup-match-card__media' aria-hidden>
            <span
              className='world-cup-match-card__bg'
              style={{ backgroundImage: `url("${backgroundImage}")` }}
            />
          </Box>
          <span className='world-cup-match-card__overlay' aria-hidden />
        </>
      ) : null}

      <CardContent className='world-cup-match-card__body'>
        <Stack
          direction='row'
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
        >
          <Typography variant='caption' className='world-cup-match-card__meta' noWrap>
            {stageText || '—'}
          </Typography>

          {venueText ? (
            <Stack
              direction='row'
              spacing={0.5}
              sx={{ alignItems: 'center', minWidth: 0, flexShrink: 0 }}
            >
              <RemixIcon icon='ri-map-pin-line' size='sm' className='world-cup-match-card__meta-icon' />
              <Typography variant='caption' className='world-cup-match-card__meta' noWrap>
                {venueText}
              </Typography>
            </Stack>
          ) : null}
        </Stack>

        {dateTimeText ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.25 }}>
            <Box className='world-cup-match-card__datetime'>{dateTimeText}</Box>
          </Box>
        ) : null}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: { xs: 1.25, sm: 1.5 },
            mt: 1.75
          }}
        >
          <TeamColumn name={match.homeTeam} countryCode={match.homeCountryCode} />

          <Stack spacing={0.25} sx={{ alignItems: 'center', px: { xs: 0.5, sm: 1 } }}>
            <Typography variant='h5' className='world-cup-match-card__score' sx={{ fontWeight: 800, lineHeight: 1 }}>
              {formatScore(match)}
            </Typography>
            <Typography variant='caption' className='world-cup-match-card__status'>
              {statusText}
            </Typography>
          </Stack>

          <TeamColumn name={match.awayTeam} countryCode={match.awayCountryCode} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default WorldCupMatchCard
