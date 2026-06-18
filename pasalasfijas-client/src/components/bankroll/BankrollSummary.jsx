import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardStatVertical from '@components/card-statistics/Vertical'

const BankrollSummary = ({ bankroll }) => (
  <Card>
    <CardHeader
      title='Gestion de banca'
      subheader='Control interno para medir rendimiento. No procesa apuestas reales.'
    />
    <CardContent className='flex flex-col gap-5'>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardStatVertical
            title='Banca inicial'
            stats={`${bankroll.currency} ${bankroll.initialAmount}`}
            avatarIcon='ri-wallet-3-line'
            avatarColor='primary'
            moreOptions={false}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardStatVertical
            title='Banca actual'
            stats={`${bankroll.currency} ${bankroll.currentAmount}`}
            avatarIcon='ri-money-dollar-circle-line'
            avatarColor='success'
            moreOptions={false}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardStatVertical
            title='ROI'
            stats={`${bankroll.roi}%`}
            avatarIcon='ri-line-chart-line'
            avatarColor='info'
            trend={bankroll.roi >= 0 ? 'positive' : 'negative'}
            trendNumber={`${Math.abs(bankroll.roi)}%`}
            moreOptions={false}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardStatVertical
            title='Win rate'
            stats={`${bankroll.winRate}%`}
            avatarIcon='ri-percent-line'
            avatarColor='warning'
            moreOptions={false}
          />
        </Grid>
      </Grid>

      <div className='flex flex-wrap gap-2'>
        <Chip variant='tonal' label={`${bankroll.totalTrackedPicks} picks trackeados`} />
        <Chip variant='tonal' color='warning' label='Stake index no es % de banca' />
      </div>
    </CardContent>
  </Card>
)

export default BankrollSummary
