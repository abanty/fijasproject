'use client'

import { useEffect, useState } from 'react'

import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import HelpInfoTooltip from '@components/shared/HelpInfoTooltip'
import RemixIcon from '@/components/shared/RemixIcon'
import PredictionList from '@/components/predictions/PredictionList'
import UpcomingPredictionsFeed from '@/components/predictions/UpcomingPredictionsFeed'
import SectionHeading from '@/components/shared/SectionHeading'
import UpgradeBanner from '@/components/subscription/UpgradeBanner'
import { PredictionsPageLoading } from '@/components/loading/PageLoading'
import { predictionsHelp } from '@/lib/ui/predictionsHelp'
import { getTodayPredictions } from '@/services/predictionsService'

const ROCKET_ICON = '/images/illustrations/characters/3d-rocket.png'

const PredictionsView = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true

    getTodayPredictions().then(result => {
      if (active) setData(result)
    })

    return () => {
      active = false
    }
  }, [])

  if (!data) {
    return <PredictionsPageLoading />
  }

  const unlockedPicks = data.items.filter(item => !item.isLocked && item.analysis?.confidence !== 'NO_BET')

  return (
    <div className='page-stack flex flex-col gap-6'>
      <div className='flex items-center gap-1'>
        <div className='relative z-[2] flex min-is-0 items-center gap-2'>
          <img
            src={ROCKET_ICON}
            alt=''
            className='-mis-4 sm:-mis-6 is-[52px] bs-[52px] sm:is-[60px] sm:bs-[60px] shrink-0 object-contain object-left'
          />
          <Typography variant='h4' component='h1'>
            Fijas recomendadas
          </Typography>
        </div>
        <HelpInfoTooltip title={predictionsHelp.page} />
      </div>

      <UpgradeBanner used={data.freeUnlocksUsed} limit={data.freeUnlocksLimit} compact />

      <section className='page-stack-sm flex flex-col gap-4'>
        <SectionHeading
          title='Siguientes encuentros'
          help={predictionsHelp.upcoming}
          action={
            <Chip
              size='small'
              variant='tonal'
              color='primary'
              icon={<RemixIcon icon='ri-pulse-line' size='xs' />}
              label='Actual'
              title={predictionsHelp.live}
            />
          }
        />

        <UpcomingPredictionsFeed predictions={data.items} />
      </section>

      {unlockedPicks.length ? (
        <section className='page-stack-sm flex flex-col gap-4'>
          <SectionHeading title='Fijas detalladas' help={predictionsHelp.detailed} />
          <PredictionList predictions={unlockedPicks} />
        </section>
      ) : null}
    </div>
  )
}

export default PredictionsView
