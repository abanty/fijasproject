import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

const PlanCard = ({ name, price, description, features = [], highlighted = false }) => (
  <Card variant={highlighted ? 'elevation' : 'outlined'}>
    <CardContent className='flex h-full flex-col gap-5'>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <Typography variant='h5'>{name}</Typography>
          <Typography color='text.secondary'>{description}</Typography>
        </div>
        {highlighted && <Chip color='primary' label='Recomendado' size='small' />}
      </div>

      <Typography variant='h3'>{price}</Typography>

      <div className='flex flex-col gap-2'>
        {features.map(feature => (
          <Typography key={feature} variant='body2'>
            <i className='ri-check-line text-success mie-2' />
            {feature}
          </Typography>
        ))}
      </div>

      <div className='mt-auto'>
        <Button fullWidth variant={highlighted ? 'contained' : 'outlined'}>
          {highlighted ? 'Activar Premium' : 'Empezar gratis'}
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default PlanCard
