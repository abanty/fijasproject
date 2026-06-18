import Typography from '@mui/material/Typography'

import MatchOfTheDay from '@/components/matches/MatchOfTheDay'
import PredictionList from '@/components/predictions/PredictionList'
import UpgradeBanner from '@/components/subscription/UpgradeBanner'

const ROCKET_ICON = '/images/illustrations/characters/3d-rocket.png'

const PredictionsView = ({ data }) => {
  const featuredMatch = data.items.find(item => !item.isLocked) || data.items[0]

  return (
    <div className='page-stack flex flex-col gap-6'>
      <div className='relative z-[2] mbs-4 flex items-start gap-3'>
        <img
          src={ROCKET_ICON}
          alt=''
          className='-mis-4 sm:-mis-6 is-[52px] bs-[52px] sm:is-[60px] sm:bs-[60px] shrink-0 object-contain object-left'
        />
        <div className='min-is-0'>
          <Typography variant='h4'>Predicciones de hoy</Typography>
          <Typography color='text.secondary'>
            Picks principales, alternativas y combinadas bajo analisis conservador. La IA puede recomendar NO BET.
          </Typography>
        </div>
      </div>

      <UpgradeBanner used={data.freeUnlocksUsed} limit={data.freeUnlocksLimit} />

      {featuredMatch ? <MatchOfTheDay match={featuredMatch} showPredictionLink={false} /> : null}

      <PredictionList predictions={data.items} />
    </div>
  )
}

export default PredictionsView
