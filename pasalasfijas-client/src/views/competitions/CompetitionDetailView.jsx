import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'
import RemixIcon from '@components/shared/RemixIcon'
import MatchList from '@/components/matches/MatchList'
import MatchOfTheDay from '@/components/matches/MatchOfTheDay'

const CompetitionDetailView = ({ competition, matches }) => {
  const featuredMatch = matches[0]

  return (
    <div className='page-stack flex flex-col gap-6'>
      <div className='page-stack-sm flex flex-col gap-3'>
        <Button
          component={Link}
          href='/matches'
          size='small'
          variant='text'
          startIcon={<RemixIcon icon='ri-arrow-left-line' size='sm' />}
          className='self-start -mis-2'
        >
          Torneos activos
        </Button>

        <div className='flex items-start gap-3'>
          <span className='competition-page-icon flex shrink-0 items-center justify-center'>
            <RemixIcon icon={competition.icon} size='lg' />
          </span>
          <div className='min-is-0 flex flex-col gap-1'>
            <Typography variant='h4'>{competition.title}</Typography>
            <Typography color='text.secondary' variant='body2'>
              {competition.description}
            </Typography>
          </div>
        </div>
      </div>

      {featuredMatch ? <MatchOfTheDay match={featuredMatch} showPredictionLink={false} /> : null}

      <MatchList matches={featuredMatch ? matches.slice(1) : matches} />
    </div>
  )
}

export default CompetitionDetailView
