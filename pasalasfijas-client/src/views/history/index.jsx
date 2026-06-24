import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'
import CardStatVertical from '@components/card-statistics/Vertical'
import CustomAvatar from '@core/components/mui/Avatar'
import { formatConfidence, formatMarket, formatOdd, resultLabels } from '@/lib/predictionFormatters'

const getResultColor = status => {
  if (status === 'WON') return 'success'
  if (status === 'LOST') return 'error'
  if (status === 'PENDING') return 'warning'

  return 'default'
}

const HistoryView = ({ historyData }) => {
  if (historyData?.locked) {
    return (
      <div className='page-stack flex flex-col gap-6'>
        <div>
          <Typography variant='h4'>Mi bitácora</Typography>
          <Typography color='text.secondary'>
            Seguimiento de fijas publicadas: resultados, precisión y rendimiento.
          </Typography>
        </div>
        <Card>
          <CardContent className='flex flex-col gap-4 items-start'>
            <Typography className='font-medium'>Historial disponible en Premium</Typography>
            <Typography variant='body2' color='text.secondary'>
              El plan gratuito no incluye bitácora completa. Mejora tu membresía para ver picks cerrados, win rate y
              rendimiento.
            </Typography>
            <Button variant='contained' component={Link} href='/pricing'>
              Ver membresía
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const history = historyData?.items ?? []
  const won = history.filter(item => item.resultStatus === 'WON').length
  const settled = history.filter(item => item.resultStatus !== 'PENDING').length
  const winRate = settled ? Math.round((won / settled) * 100) : 0

  return (
    <div className='page-stack flex flex-col gap-6'>
      <div>
        <Typography variant='h4'>Mi bitácora</Typography>
        <Typography color='text.secondary'>Seguimiento de fijas publicadas: resultados, precisión y rendimiento.</Typography>
      </div>

      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CardStatVertical
            title='Picks cerrados'
            stats={String(settled)}
            avatarIcon='ri-history-line'
            avatarColor='primary'
            moreOptions={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CardStatVertical
            title='Ganados'
            stats={String(won)}
            avatarIcon='ri-trophy-line'
            avatarColor='success'
            moreOptions={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CardStatVertical
            title='Win rate'
            stats={`${winRate}%`}
            avatarIcon='ri-percent-line'
            avatarColor='info'
            moreOptions={false}
          />
        </Grid>
      </Grid>

      <Card>
        <CardHeader title='Historial de picks' subheader='Resultados trackeados internamente' />
        <CardContent className='flex flex-col gap-[1.71rem]'>
          {history.length ? (
            history.map(item => (
            <div key={item.id} className='flex items-start gap-3'>
              <CustomAvatar color={getResultColor(item.resultStatus)} skin='light' size={38}>
                <i className='ri-football-line text-lg' />
              </CustomAvatar>

              <div className='flex justify-between items-start is-full flex-wrap gap-x-4 gap-y-2'>
                <div className='flex flex-col gap-1'>
                  <Typography className='font-medium'>{item.match}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {formatMarket(item.market)} · {item.selection} · Cuota {formatOdd(item.odd)}
                  </Typography>
                  <div className='flex flex-wrap gap-2 mbs-1'>
                    <Chip size='small' variant='tonal' label={formatConfidence(item.confidence)} />
                    <Chip size='small' variant='tonal' label={`Stake ${item.stakeIndex}/100`} />
                  </div>
                </div>
                <Chip
                  label={resultLabels[item.resultStatus] || item.resultStatus}
                  color={getResultColor(item.resultStatus)}
                  size='small'
                  variant='tonal'
                />
              </div>
            </div>
            ))
          ) : (
            <Typography color='text.secondary'>Aun no hay picks cerrados en el historial.</Typography>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default HistoryView
