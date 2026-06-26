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
        <div className='upgrade-banner__content flex flex-col gap-2 sm:max-is-[58%] min-is-0'>
          <div className='flex items-center gap-1 flex-wrap'>
            <Typography className='font-medium' variant='body2'>
              Gratis: {used}/{limit} hoy
            </Typography>
            <HelpInfoTooltip title={predictionsHelp.freePlan} iconClassName='ri-question-line' />
          </div>
          <LinearProgress variant='determinate' value={progress} color='primary' className='max-is-[200px]' />
          <Button
            size='small'
            variant='contained'
            component={Link}
            href='/pricing'
            className='self-start shrink-0'
          >
            Premium
          </Button>
        </div>
      </CardContent>
      {!compact ? <CharacterFigure src={MESSI_AVATAR} alt='' banner /> : null}
    </Card>
  )
}

export default UpgradeBanner
