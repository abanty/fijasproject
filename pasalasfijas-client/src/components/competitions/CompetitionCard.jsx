'use client'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import Link from '@components/Link'
import RemixIcon from '@components/shared/RemixIcon'
import { prefetchNavData } from '@/lib/query/prefetchNavData'

const navPrefetchProps = href => ({
  onMouseEnter: () => prefetchNavData(href),
  onFocus: () => prefetchNavData(href),
  onTouchStart: () => prefetchNavData(href)
})

const CompetitionCard = ({ competition, matchCount }) => {
  const href = `/matches/${competition.slug}`
  const hasBackground = Boolean(competition.cardBackgroundImage)

  const countLabel =
    competition.matchCountLabel ??
    (typeof matchCount === 'number' && matchCount > 0 ? `${matchCount} partidos` : null)

  return (
    <Card
      component={Link}
      href={href}
      {...navPrefetchProps(href)}
      className={classnames('competition-card block no-underline text-inherit', {
        'competition-card--featured': competition.featured,
        'competition-card--has-bg': hasBackground
      })}
    >
      {hasBackground ? (
        <>
          <span
            className='competition-card__bg'
            style={{ backgroundImage: `url("${competition.cardBackgroundImage}")` }}
            aria-hidden
          />
          <span className='competition-card__overlay' aria-hidden />
        </>
      ) : null}

      <CardContent className='competition-card__body flex flex-col gap-4 p-5 sm:p-6'>
        <div className='flex items-start gap-4'>
          <div className='competition-card__icon flex shrink-0 items-center justify-center'>
            <RemixIcon icon={competition.icon} size='xl' />
          </div>
          <div className='min-is-0 flex flex-col gap-2'>
            <Typography
              variant='h6'
              className='competition-card__title font-semibold leading-snug'
              sx={hasBackground ? { color: '#fff' } : undefined}
            >
              {competition.title}
            </Typography>
            <Typography
              variant='body2'
              color={hasBackground ? undefined : 'text.secondary'}
              className='competition-card__description leading-relaxed'
              sx={hasBackground ? { color: 'rgb(255 255 255 / 0.82)' } : undefined}
            >
              {competition.description}
            </Typography>
          </div>
        </div>

        <div className='flex items-center justify-between gap-3 mbs-auto'>
          {countLabel ? (
            <Chip
              size='small'
              variant='tonal'
              color={hasBackground ? 'default' : 'primary'}
              label={countLabel}
              className='competition-card__chip'
              sx={
                hasBackground
                  ? {
                      color: '#fff',
                      border: '1px solid rgb(255 255 255 / 0.22)',
                      backgroundColor: 'rgb(255 255 255 / 0.14)',
                      '& .MuiChip-label': { color: '#fff' }
                    }
                  : undefined
              }
            />
          ) : (
            <span />
          )}
          <Button
            component='span'
            size='small'
            variant='text'
            color={hasBackground ? 'inherit' : competition.featured ? 'primary' : 'inherit'}
            className='competition-card__cta shrink-0'
            sx={hasBackground ? { color: '#fff' } : undefined}
            endIcon={<RemixIcon icon='ri-arrow-right-line' size='sm' />}
          >
            Ver partidos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompetitionCard
