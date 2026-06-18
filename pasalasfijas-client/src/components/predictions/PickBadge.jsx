import Chip from '@mui/material/Chip'

import { formatMarket } from '@/lib/predictionFormatters'

const PickBadge = ({ market }) => (
  <Chip size='small' color='primary' variant='tonal' label={formatMarket(market)} />
)

export default PickBadge
