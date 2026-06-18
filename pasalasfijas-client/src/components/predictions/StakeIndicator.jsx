import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import { formatStakeIndex } from '@/lib/predictionFormatters'

const getColor = stakeIndex => {
  const value = Number(stakeIndex || 0)

  if (value <= 30) return 'success'
  if (value <= 60) return 'warning'

  return 'error'
}

const StakeIndicator = ({ stakeIndex }) => {
  const value = Math.max(0, Math.min(Number(stakeIndex || 0), 100))

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-3'>
        <Typography variant='body2' color='text.secondary'>
          Stake index
        </Typography>
        <Typography variant='body2' className='font-medium'>
          {formatStakeIndex(stakeIndex)}
        </Typography>
      </div>
      <LinearProgress variant='determinate' value={value} color={getColor(stakeIndex)} />
      <Typography variant='caption' color='text.secondary'>
        Indice de 0 a 100. No representa apostar ese porcentaje de la banca.
      </Typography>
    </div>
  )
}

export default StakeIndicator
