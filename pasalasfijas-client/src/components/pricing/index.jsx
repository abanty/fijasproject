'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import PlanDetails from './PlanDetails'
import DirectionalIcon from '@components/DirectionalIcon'

const Pricing = ({ data }) => {
  const [pricingPlan, setPricingPlan] = useState('annually')
  const theme = useTheme()
  const columnSize = data?.length === 2 ? 6 : 4

  const handleChange = e => {
    setPricingPlan(e.target.checked ? 'annually' : 'monthly')
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Typography variant='h4'>Planes</Typography>
        <div className='flex items-center text-center flex-col mbe-[2.8rem]'>
          <Typography>Empieza gratis y desbloquea mas analisis cuando lo necesites.</Typography>
          <Typography>Elige el plan que mejor se adapte a tu seguimiento diario.</Typography>
        </div>
        <div className='flex justify-center items-center relative mbs-0.5'>
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer text-textSecondary'>
            Mensual
          </InputLabel>
          <Switch id='pricing-switch' onChange={handleChange} checked={pricingPlan === 'annually'} />
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer text-textSecondary'>
            Anual
          </InputLabel>

          <div
            className={classnames('flex absolute max-sm:hidden block-start-[-41px] translate-x-[35%]', {
              'right-full': theme.direction === 'rtl',
              'left-1/2': theme.direction !== 'rtl'
            })}
          >
            <DirectionalIcon
              ltrIconClass='ri-corner-left-down-line'
              rtlIconClass='ri-corner-right-down-line'
              className='mbs-2 mie-1 text-textDisabled'
            />
            <Chip label='Ahorra hasta 20%' size='small' color='primary' variant='tonal' />
          </div>
        </div>
      </div>
      <Grid container spacing={6}>
        {data?.map((plan, index) => (
          <Grid size={{ xs: 12, md: columnSize }} key={index}>
            <PlanDetails data={plan} pricingPlan={pricingPlan} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Pricing
