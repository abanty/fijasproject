import Typography from '@mui/material/Typography'

import MatchList from '@/components/matches/MatchList'
import MatchOfTheDay from '@/components/matches/MatchOfTheDay'

const MatchesView = ({ matches }) => {
  const featuredMatch = matches[0]

  return (
    <div className='page-stack flex flex-col gap-6'>
      <div className='page-stack-sm'>
        <Typography variant='h4'>Partidos del dia</Typography>
        <Typography color='text.secondary' variant='body2'>
          Calendario inicial con mocks. Cuando el backend este listo se conectara a /matches/today.
        </Typography>
      </div>

      {featuredMatch ? <MatchOfTheDay match={featuredMatch} showPredictionLink={false} /> : null}

      <MatchList matches={matches.slice(1)} />
    </div>
  )
}

export default MatchesView
