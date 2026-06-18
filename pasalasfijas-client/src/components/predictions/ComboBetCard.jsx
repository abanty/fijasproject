import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import ConfidenceBadge from './ConfidenceBadge'
import RiskScoreBadge from './RiskScoreBadge'
import StakeIndicator from './StakeIndicator'
import { formatOdd } from '@/lib/predictionFormatters'

const ComboBetCard = ({ comboBet }) => {
  if (!comboBet) return null

  return (
    <Card variant='outlined'>
      <CardHeader
        title={comboBet.title}
        subheader='Combinada sugerida solo si el perfil de riesgo lo permite.'
        action={<Chip label={`Cuota ${formatOdd(comboBet.totalOdd)}`} size='small' variant='tonal' color='info' />}
      />
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-wrap gap-2'>
          <ConfidenceBadge confidence={comboBet.confidence} />
          <RiskScoreBadge riskScore={comboBet.riskScore} />
        </div>

        <div className='flex flex-wrap gap-2'>
          {(comboBet.legs || []).map(leg => (
            <Chip key={leg} label={leg} variant='tonal' size='small' />
          ))}
        </div>

        <div className='rounded border p-4'>
          <StakeIndicator stakeIndex={comboBet.stakeIndex} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ComboBetCard
