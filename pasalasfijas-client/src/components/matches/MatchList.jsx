import Typography from '@mui/material/Typography'

import MatchCard from './MatchCard'

const MatchList = ({ matches = [] }) => {
  if (!matches.length) {
    return <Typography color='text.secondary'>No hay partidos disponibles.</Typography>
  }

  return (
    <div className='flex flex-col gap-4'>
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}

export default MatchList
