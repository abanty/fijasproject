'use client'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'

import Link from '@components/Link'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import ConfidenceBadge from '@/components/predictions/ConfidenceBadge'
import RiskScoreBadge from '@/components/predictions/RiskScoreBadge'
import MatchHeader from './MatchHeader'

const statusLabels = {
  SCHEDULED: 'Proximo',
  LIVE: 'En juego',
  FINISHED: 'Finalizado'
}

const MatchCard = ({ match }) => {
  const compact = useCompactDensity()
  const analysis = match.analysis || {}

  return (
    <Card>
      <CardContent
        className={
          compact
            ? 'match-row'
            : 'flex flex-col gap-4 md:flex-row md:items-center md:justify-between'
        }
      >
        <MatchHeader
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          homeCountryCode={match.homeCountryCode}
          awayCountryCode={match.awayCountryCode}
          competition={match.competition}
          kickoffAt={match.kickoffAt}
          titleVariant='h6'
        />

        <div className='flex flex-wrap items-center gap-2 md:justify-end'>
          <Chip
            size='small'
            variant='tonal'
            color={match.status === 'LIVE' ? 'error' : 'default'}
            label={statusLabels[match.status] || match.status}
          />
          <ConfidenceBadge confidence={analysis.confidence} />
          <RiskScoreBadge riskScore={analysis.riskScore} />
          <Button size='small' variant='contained' component={Link} href='/predictions'>
            Ver prediccion
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default MatchCard
