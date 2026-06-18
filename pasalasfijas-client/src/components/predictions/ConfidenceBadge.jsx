import Chip from '@mui/material/Chip'

import { formatConfidence } from '@/lib/predictionFormatters'

const getColor = confidence => {
  if (confidence === 'HIGH') return 'success'
  if (confidence === 'MEDIUM') return 'warning'
  if (confidence === 'NO_BET') return 'error'

  return 'default'
}

const ConfidenceBadge = ({ confidence }) => (
  <Chip size='small' color={getColor(confidence)} variant='tonal' label={formatConfidence(confidence)} />
)

export default ConfidenceBadge
