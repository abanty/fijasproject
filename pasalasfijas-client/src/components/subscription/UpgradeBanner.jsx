import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'
import HelpInfoTooltip from '@components/shared/HelpInfoTooltip'
import CharacterFigure from '@/components/card-statistics/CharacterFigure'
import { predictionsHelp } from '@/lib/ui/predictionsHelp'

const MESSI_AVATAR = '/images/avatars/messi.png'

const UpgradeBanner = ({ used = 0, limit = 2, compact = false }) => {
  const progress = limit ? Math.min((used / limit) * 100, 100) : 0

  return (
    <Card className='character-card relative overflow-visible mbe-2'>
      <CardContent className='relative overflow-visible p-4 sm:p-5'>
        <div
          className={
            compact
              ? 'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'
              : 'max-is-[calc(100%-7rem)] sm:max-is-[calc(100%-10rem)] flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'
          }
        >
          <div className='flex flex-col gap-2 min-is-0'>
            <div className='flex items-center gap-1 flex-wrap'>
              <Typography className='font-medium'>
                {compact ? `Gratis: ${used}/${limit} hoy` : `Plan gratuito: ${used}/${limit} predicciones desbloqueadas hoy`}
              </Typography>
              {compact ? (
                <HelpInfoTooltip title={predictionsHelp.freePlan} iconClassName='ri-question-line' />
              ) : null}
            </div>
            {!compact ? (
              <Typography variant='body2' color='text.secondary'>
                Premium: todos los picks, combinadas e historial.
              </Typography>
            ) : null}
            <LinearProgress variant='determinate' value={progress} color='primary' className='max-is-[320px]' />
          </div>
          <Button variant='contained' component={Link} href='/pricing' className='self-start lg:self-center shrink-0'>
            {compact ? 'Premium' : 'Ver Premium'}
          </Button>
        </div>
      </CardContent>
      {!compact ? <CharacterFigure src={MESSI_AVATAR} alt='' banner /> : null}
    </Card>
  )
}

export default UpgradeBanner
