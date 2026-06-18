import Chip from '@mui/material/Chip'

import { formatRisk, getRiskLabel } from '@/lib/predictionFormatters'

const getColor = riskScore => {
  if (riskScore === null || riskScore === undefined) return 'default'
  if (riskScore <= 35) return 'success'
  if (riskScore <= 65) return 'warning'

  return 'error'
}

const RiskScoreBadge = ({ riskScore }) => (
  <Chip
    size='small'
    color={getColor(riskScore)}
    variant='tonal'
    label={`${getRiskLabel(riskScore)} · ${formatRisk(riskScore)}`}
  />
)

export default RiskScoreBadge
