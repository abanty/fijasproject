import Typography from '@mui/material/Typography'

import LockedPredictionCard from './LockedPredictionCard'
import PredictionCard from './PredictionCard'

const PredictionList = ({ predictions = [] }) => {
  if (!predictions.length) {
    return <Typography color='text.secondary'>No hay predicciones disponibles.</Typography>
  }

  return (
    <div className='flex flex-col gap-6'>
      {predictions.map(prediction =>
        prediction.isLocked ? (
          <LockedPredictionCard key={prediction.id} prediction={prediction} />
        ) : (
          <PredictionCard key={prediction.id} prediction={prediction} />
        )
      )}
    </div>
  )
}

export default PredictionList
