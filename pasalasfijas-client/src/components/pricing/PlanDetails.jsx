// MUI Imports
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'

const PlanDetails = ({ data, pricingPlan, onUpgrade, upgrading = false }) => {
  const price = pricingPlan === 'monthly' ? data?.monthlyPrice : data?.yearlyPlan.monthly
  const isPremiumPlan = data?.code === 'PREMIUM'
  const canUpgrade = isPremiumPlan && !data?.currentPlan && onUpgrade

  return (
    <CardContent
      className={classnames('relative pli-5 !pbe-5 flex flex-col gap-5 border rounded pbs-5', {
        'border-primary': data?.popularPlan
      })}
    >
      {data?.popularPlan ? (
        <Chip
          color='primary'
          label='Recomendado'
          size='small'
          className='absolute block-start-4 inline-end-5'
          variant='tonal'
        />
      ) : null}
      <div className='text-center flex flex-col gap-1'>
        <Typography variant='h4'>{data?.title}</Typography>
        <Typography>{data?.subtitle}</Typography>
      </div>
      <div className='relative mlb-3'>
        <div className='flex justify-center'>
          {price > 0 ? (
            <Typography component='sup' className='self-start font-medium'>
              $
            </Typography>
          ) : null}
          <Typography variant='h1' component='span' color='primary.main'>
            {price > 0 ? price : 'Gratis'}
          </Typography>
          {price > 0 ? (
            <Typography component='sub' className='self-end font-medium'>
              /mes
            </Typography>
          ) : null}
        </div>
        {pricingPlan !== 'monthly' && data?.monthlyPrice !== 0 ? (
          <Typography variant='caption' className='absolute inline-end-1/2 translate-x-[50%]'>
            {`USD ${data?.yearlyPlan.annually}/año`}
          </Typography>
        ) : null}
      </div>
      <div className='flex flex-col gap-3'>
        {data?.planBenefits.map((item, index) => (
          <Typography key={index} color='text.secondary'>
            {item}
          </Typography>
        ))}
      </div>
      <Button
        fullWidth
        component={canUpgrade ? undefined : data?.currentPlan ? undefined : Link}
        href={canUpgrade || data?.currentPlan ? undefined : '/pricing'}
        onClick={canUpgrade ? () => onUpgrade(data.code) : undefined}
        disabled={canUpgrade && upgrading}
        color={data?.currentPlan ? 'success' : 'primary'}
        variant={data?.popularPlan ? 'contained' : 'outlined'}
      >
        {data?.currentPlan ? 'Plan actual' : canUpgrade ? (upgrading ? 'Activando...' : 'Activar Premium') : 'Mejorar plan'}
      </Button>
    </CardContent>
  )
}

export default PlanDetails
