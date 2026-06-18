import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'
import MatchHeader from '@/components/matches/MatchHeader'
import ConfidenceBadge from './ConfidenceBadge'
import RiskScoreBadge from './RiskScoreBadge'

const LockedPredictionCard = ({ prediction }) => {
  const analysis = prediction.analysis || {}

  return (
    <Card className='border border-primary'>
      <CardHeader
        title={
          <MatchHeader
            homeTeam={prediction.homeTeam}
            awayTeam={prediction.awayTeam}
            homeCountryCode={prediction.homeCountryCode}
            awayCountryCode={prediction.awayCountryCode}
            competition={prediction.competition}
            kickoffAt={prediction.kickoffAt}
            titleVariant='h6'
          />
        }
        action={<Chip color='primary' size='small' variant='tonal' label='Premium' icon={<i className='ri-vip-crown-line' />} />}
      />
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-wrap gap-2'>
          <ConfidenceBadge confidence={analysis.confidence} />
          <RiskScoreBadge riskScore={analysis.riskScore} />
        </div>

        <Typography variant='body2' color='text.secondary'>
          La IA detecto informacion relevante para este partido. Desbloquea Premium para ver mercado, pick, stake y motivo.
        </Typography>

        <div className='relative overflow-hidden rounded border p-4'>
          <div className='blur-sm select-none pointer-events-none flex flex-col gap-2'>
            <Typography variant='h6'>Pick principal bloqueado</Typography>
            <Typography>Mercado: ███████████</Typography>
            <Typography>Seleccion: ███████████</Typography>
            <Typography>Stake: ██/100</Typography>
          </div>
          <div className='absolute inset-0 flex items-center justify-center bg-actionHover/40'>
            <Chip color='primary' variant='filled' icon={<i className='ri-lock-line' />} label='Contenido Premium' />
          </div>
        </div>

        <div className='rounded bg-actionHover p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-3'>
            <CustomAvatar color='primary' skin='light' size={42}>
              <i className='ri-vip-crown-line text-xl' />
            </CustomAvatar>
            <div>
              <Typography className='font-medium'>Desbloquea todas las predicciones</Typography>
              <Typography variant='body2' color='text.secondary'>
                Picks, stake index, alternativas y combinadas del dia.
              </Typography>
            </div>
          </div>
          <Button variant='contained' component={Link} href='/pricing'>
            Ver planes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LockedPredictionCard
