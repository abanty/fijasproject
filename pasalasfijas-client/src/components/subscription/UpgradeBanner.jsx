import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'
import CharacterFigure from '@/components/card-statistics/CharacterFigure'

const MESSI_AVATAR = '/images/avatars/messi.png'

const UpgradeBanner = ({ used = 0, limit = 2 }) => {
  const progress = limit ? Math.min((used / limit) * 100, 100) : 0

  return (
    <Card className='character-card relative overflow-visible mbe-2'>
      <CardContent className='relative overflow-visible p-4 sm:p-5'>
        <div className='max-is-[calc(100%-7rem)] sm:max-is-[calc(100%-10rem)] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex flex-col gap-2'>
            <Typography className='font-medium'>
              Plan gratuito: {used}/{limit} predicciones desbloqueadas hoy
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Pasa a Premium para ver todos los picks, combinadas, stake index e historial completo.
            </Typography>
            <LinearProgress variant='determinate' value={progress} color='primary' className='max-is-[320px]' />
          </div>
          <Button variant='contained' component={Link} href='/pricing' className='self-start lg:self-center shrink-0'>
            Ver Premium
          </Button>
        </div>
      </CardContent>
      <CharacterFigure src={MESSI_AVATAR} alt='' banner />
    </Card>
  )
}

export default UpgradeBanner
