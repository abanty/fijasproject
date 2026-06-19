import Typography from '@mui/material/Typography'

import RemixIcon from '@/components/shared/RemixIcon'
import CompetitionCard from '@/components/competitions/CompetitionCard'

const CompetitionsView = ({ competitions, matchCounts = {} }) => (
  <div className='page-stack flex flex-col gap-6'>
    <div className='page-stack-sm flex flex-col gap-2'>
      <div className='flex items-center gap-2.5'>
        <span className='competition-page-icon flex items-center justify-center'>
          <RemixIcon icon='ri-trophy-line' size='lg' />
        </span>
        <Typography variant='h4'>Torneos activos</Typography>
      </div>
      <Typography color='text.secondary' variant='body2'>
        Elige un torneo para ver calendario, resultados y fijas del modelo.
      </Typography>
    </div>

    <div className='competition-grid grid gap-4 md:grid-cols-2'>
      {competitions.map(competition => (
        <CompetitionCard
          key={competition.id}
          competition={competition}
          matchCount={matchCounts[competition.slug]}
        />
      ))}
    </div>
  </div>
)

export default CompetitionsView
